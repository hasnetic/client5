import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function GET(request) {
  try {
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ 
        authenticated: false 
      }, { status: 401 });
    }

    const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    return NextResponse.json({
      authenticated: true,
      role: decoded.role
    });
  } catch (error) {
    return NextResponse.json({ 
      authenticated: false,
      error: error.message 
    }, { status: 401 });
  }
}