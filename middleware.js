import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const kycStatus = request.cookies.get('kycStatus')?.value; // submitted|approved
  const haveAccountDetails = request.cookies.get('haveAccountDetails')?.value; // 'true'|'false'

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

  // After login, gate by account details and KYC status.
  if (accessToken) {
    const inKyc = pathname.startsWith('/kyc');
    const inAuth = pathname.startsWith('/auth');

    if (haveAccountDetails !== 'true' && !inKyc) {
      const url = request.nextUrl.clone();
      url.pathname = '/kyc/account-setup';
      return NextResponse.redirect(url);
    }

    if (haveAccountDetails === 'true' && !inKyc) {
      if (kycStatus === 'submitted') {
        const url = request.nextUrl.clone();
        url.pathname = '/kyc/kyc-submitted';
        return NextResponse.redirect(url);
      }
      if (kycStatus !== 'approved') {
        const url = request.nextUrl.clone();
        url.pathname = '/kyc/kyc-verification';
        return NextResponse.redirect(url);
      }
    }

    if (inAuth) {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
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
    '/auth/:path*',
    '/kyc/:path*',
  ],
};


