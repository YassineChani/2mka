import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Type de fichier non autorisé.' }, { status: 400 });
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Fichier trop volumineux. Maximum 5 Mo.' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const fileBuffer = await file.arrayBuffer();

    // Upload directly via Supabase REST API (bypasses SDK compatibility issues)
    const uploadRes = await fetch(
      `${supabaseUrl}/storage/v1/object/portfolio/${fileName}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'apikey': supabaseKey,
          'Content-Type': file.type,
          'x-upsert': 'false',
        },
        body: fileBuffer,
      }
    );

    if (!uploadRes.ok) {
      const errorText = await uploadRes.text();
      console.error('Storage upload error:', errorText);
      return NextResponse.json({ error: `Upload failed: ${errorText}` }, { status: 500 });
    }

    // Return public URL
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/portfolio/${fileName}`;
    return NextResponse.json({ url: publicUrl, fileName });

  } catch (err) {
    console.error('Upload API error:', err);
    return NextResponse.json({ error: 'Erreur serveur lors de l\'upload.' }, { status: 500 });
  }
}
