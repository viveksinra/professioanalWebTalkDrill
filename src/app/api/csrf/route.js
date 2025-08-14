import { NextResponse } from 'next/server';

export async function GET() {
  const token = crypto.randomUUID();
  const res = NextResponse.json({ csrfToken: token });
  res.cookies.set('csrfToken', token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
  return res;
}


