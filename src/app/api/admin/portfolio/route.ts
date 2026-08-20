import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ items: [] });
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/portfolio_items?select=*&order=display_order.asc,created_at.desc`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json({ items: [] });
    }

    const items = await res.json();
    return NextResponse.json({ items: Array.isArray(items) ? items : [] });
  } catch (err) {
    console.error('Error fetching portfolio items:', err);
    return NextResponse.json({ items: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase non configuré' }, { status: 500 });
    }

    const formData = await request.formData();
    const id = formData.get('id') as string | null;
    const title = formData.get('title') as string;
    const description = (formData.get('description') as string) || '';
    const category = (formData.get('category') as string) || 'Général';
    const imageFile = formData.get('image') as File | null;
    let existingImageUrl = (formData.get('existing_image_url') as string) || '';

    let imageUrl = existingImageUrl;

    // Handle Image Upload if new image is provided
    if (imageFile && imageFile.size > 0) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      if (!allowedTypes.includes(imageFile.type)) {
        return NextResponse.json({ error: 'Format de fichier non autorisé (JPEG, PNG, WebP uniquement)' }, { status: 400 });
      }

      if (imageFile.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: 'Fichier trop volumineux (Max 10 Mo)' }, { status: 400 });
      }

      const fileExt = imageFile.name.split('.').pop() || 'jpg';
      const cleanName = imageFile.name.replace(/[^a-zA-Z0-9]/g, '_');
      const fileName = `${Date.now()}_${cleanName}.${fileExt}`;
      const buffer = await imageFile.arrayBuffer();

      const uploadRes = await fetch(`${supabaseUrl}/storage/v1/object/portfolio/${fileName}`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': imageFile.type,
          'x-upsert': 'true',
        },
        body: buffer,
      });

      if (!uploadRes.ok) {
        const errorText = await uploadRes.text();
        console.error('Storage upload error:', errorText);
        return NextResponse.json({ error: `Erreur d'upload: ${errorText}` }, { status: 500 });
      }

      imageUrl = `${supabaseUrl}/storage/v1/object/public/portfolio/${fileName}`;
    }

    if (!imageUrl) {
      return NextResponse.json({ error: 'Veuillez sélectionner une image pour la réalisation.' }, { status: 400 });
    }

    if (id) {
      // Update existing item
      const updateRes = await fetch(`${supabaseUrl}/rest/v1/portfolio_items?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation',
        },
        body: JSON.stringify({
          title,
          description: description || null,
          category: category || null,
          image_url: imageUrl,
        }),
      });

      if (!updateRes.ok) {
        const errText = await updateRes.text();
        return NextResponse.json({ error: `Erreur de mise à jour: ${errText}` }, { status: 500 });
      }

      const updated = await updateRes.json();
      return NextResponse.json({ success: true, item: updated[0] });
    } else {
      // Insert new item
      const insertRes = await fetch(`${supabaseUrl}/rest/v1/portfolio_items`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation',
        },
        body: JSON.stringify({
          title,
          description: description || null,
          category: category || null,
          image_url: imageUrl,
          display_order: 0,
        }),
      });

      if (!insertRes.ok) {
        const errText = await insertRes.text();
        return NextResponse.json({ error: `Erreur d'enregistrement: ${errText}` }, { status: 500 });
      }

      const inserted = await insertRes.json();
      return NextResponse.json({ success: true, item: inserted[0] });
    }
  } catch (err) {
    console.error('Portfolio API error:', err);
    return NextResponse.json({ error: 'Une erreur serveur est survenue.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || !supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Paramètre ID manquant' }, { status: 400 });
    }

    const deleteRes = await fetch(`${supabaseUrl}/rest/v1/portfolio_items?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!deleteRes.ok) {
      const errText = await deleteRes.text();
      return NextResponse.json({ error: `Erreur de suppression: ${errText}` }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Delete portfolio error:', err);
    return NextResponse.json({ error: 'Erreur lors de la suppression.' }, { status: 500 });
  }
}
