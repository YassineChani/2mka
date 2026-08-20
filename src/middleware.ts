import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check our server-set admin cookie (set by /api/admin-login)
  const hasAdminCookie = request.cookies.get('admin_auth')?.value === 'true';

  // Protect /admin/* (except /admin/login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!hasAdminCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // If logged in and visiting login page, redirect to dashboard
  if (pathname === '/admin/login' && hasAdminCookie) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
