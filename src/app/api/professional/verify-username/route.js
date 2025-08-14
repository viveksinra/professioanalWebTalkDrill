import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const token = request.cookies.get('accessToken')?.value;
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const username = String(body?.username || '').trim();
    if (!username) return NextResponse.json({ message: 'Invalid' }, { status: 400 });

    // Demo: declare names with 'taken' as unavailable
    const isAvailable = !username.toLowerCase().includes('taken');
    return NextResponse.json({ available: isAvailable });
  } catch (error) {
    return NextResponse.json({ message: 'Failed' }, { status: 500 });
  }
}


