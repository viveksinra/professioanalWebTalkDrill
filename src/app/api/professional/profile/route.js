import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const token = request.cookies.get('accessToken')?.value;
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const profile = {
      id: 'pro-1',
      name: 'Professional Tutor',
      username: 'pro.tutor',
      timezone: 'UTC',
      specialization: ['English'],
      languages: ['English'],
      kycStatus: 'submitted',
      haveAccountDetails: false,
    };

    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ message: 'Failed' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const token = request.cookies.get('accessToken')?.value;
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();

    const res = NextResponse.json({ success: true, ...body });

    if (typeof body.haveAccountDetails === 'boolean') {
      res.cookies.set('haveAccountDetails', String(body.haveAccountDetails), {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });
    }
    if (typeof body.kycStatus === 'string') {
      res.cookies.set('kycStatus', body.kycStatus, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });
    }

    return res;
  } catch (error) {
    return NextResponse.json({ message: 'Failed' }, { status: 500 });
  }
}


