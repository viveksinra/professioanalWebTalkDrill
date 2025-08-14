import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const token = request.cookies.get('accessToken')?.value;
    if (!token) {
      return NextResponse.json({ message: 'No session' }, { status: 401 });
    }

    // Placeholder: rotate/extend token if using real backend
    const res = NextResponse.json({ success: true });
    res.cookies.set('accessToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (error) {
    return NextResponse.json({ message: 'Refresh failed' }, { status: 500 });
  }
}


