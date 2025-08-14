import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const token = body?.token || body?.accessToken;
    if (!token) {
      return NextResponse.json({ message: 'Missing token' }, { status: 400 });
    }

    const res = NextResponse.json({ success: true });

    res.cookies.set('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (error) {
    return NextResponse.json({ message: 'Login failed' }, { status: 500 });
  }
}


