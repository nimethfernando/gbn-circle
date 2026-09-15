import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'fallback-secret-key-min-32-characters-long'
);

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow unauthenticated access to the login API
  if (pathname === '/api/admin/login') {
    return NextResponse.next();
  }

  // If already authenticated and accessing the login page, redirect to the dashboard
  if (pathname === '/admin/login') {
    const sessionCookie = req.cookies.get('gbn_admin_session')?.value;
    if (sessionCookie) {
      try {
        const { payload } = await jwtVerify(sessionCookie, SECRET_KEY);
        if (payload.role === 'admin') {
          return NextResponse.redirect(new URL('/admin/events', req.url));
        }
      } catch {
        // Invalid session cookie, allow viewing the login screen
      }
    }
    return NextResponse.next();
  }

  // Intercept all /admin and /api/admin paths
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const sessionCookie = req.cookies.get('gbn_admin_session')?.value;

    let isAuthenticated = false;

    if (sessionCookie) {
      try {
        const { payload } = await jwtVerify(sessionCookie, SECRET_KEY);
        if (payload.role === 'admin') {
          isAuthenticated = true;
        }
      } catch {
        isAuthenticated = false;
      }
    }

    if (!isAuthenticated) {
      // Return 401 JSON for API calls
      if (pathname.startsWith('/api/admin')) {
        return NextResponse.json(
          { success: false, message: 'Unauthorized access. Valid administrator session required.' },
          { status: 401 }
        );
      }

      // Redirect UI views to the admin login screen
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};