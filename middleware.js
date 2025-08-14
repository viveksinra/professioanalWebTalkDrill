import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;

  const isProtectedPath = [
    '/dashboard',
    '/schedule',
    '/earnings',
    '/students',
    '/profile',
    '/notifications',
    '/notification-settings',
    '/manage-working-hour',
    '/availability-settings',
    '/session-details',
    '/reschedule-session',
    '/session-requests',
    '/professional-session-call',
    '/student-review',
    '/chat',
  ].some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (isProtectedPath && !accessToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/schedule/:path*',
    '/earnings/:path*',
    '/students/:path*',
    '/profile/:path*',
    '/notifications/:path*',
    '/notification-settings/:path*',
    '/manage-working-hour/:path*',
    '/availability-settings/:path*',
    '/session-details/:path*',
    '/reschedule-session/:path*',
    '/session-requests/:path*',
    '/professional-session-call/:path*',
    '/student-review/:path*',
    '/chat/:path*',
  ],
};


