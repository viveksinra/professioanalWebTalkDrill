import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const token = request.cookies.get('accessToken')?.value;
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    // Placeholder: decode or fetch user by token
    const user = { id: 'me', name: 'Professional', role: 'professional' };

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}


