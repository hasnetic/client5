// app/api/users/profile/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import User from '@/lib/models/user';
import { initDb } from '@/lib/db';

export async function GET(request) {
  try {
    // Initialize database
    await initDb();

    // Get token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    // Validate token
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Decode token
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'your-secret-key'
    );

    // Fetch user profile
    const user = await User.findByPk(decoded.userId, {
      attributes: [
        'id', 
        'username', 
        'email', 
        'role', 
        'artype', 
        'createdAt'
      ],
      raw: true
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' }, 
      { status: 500 }
    );
  }
}