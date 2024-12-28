import { NextResponse } from 'next/server';
import User from '@/lib/models/user';
import { initDb } from '@/lib/db';

export async function POST(request) {
  try {
    await initDb();
    const { username, email, password, artype, role } = await request.json();

    const user = await User.create({
      username,
      email,
      password,
      artype,
      role
    });

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}