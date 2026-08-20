import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ messages: [] });
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/contact_submissions?select=*&order=created_at.desc`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json({ messages: [] });
    }

    const messages = await res.json();
    return NextResponse.json({ messages: Array.isArray(messages) ? messages : [] });
  } catch (err) {
    console.error('Error fetching messages:', err);
    return NextResponse.json({ messages: [] });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const body = await request.json();
    const { id, is_read } = body;

    if (!id || !supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Paramètres manquants' }, { status: 400 });
    }

    const res = await fetch(`${supabaseUrl}/rest/v1/contact_submissions?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_read }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Erreur mise à jour' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
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

    const res = await fetch(`${supabaseUrl}/rest/v1/contact_submissions?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Erreur suppression' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
