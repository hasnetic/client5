import { NextResponse } from 'next/server';
import User from '@/lib/models/user';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  try {
    const token = request.cookies.get('token')?.value;
    const decoded = await verifyToken(token);
    
    const user = await User.findByPk(decoded.userId, {
      attributes: ['id', 'username', 'email', 'artype']
    });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}