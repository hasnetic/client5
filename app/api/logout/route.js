
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
 
    const response = NextResponse.json({ 
      message: 'Logged out successfully',
      status: 'success'
    }, {
      status: 200
    });

   
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/', 
      expires: new Date(0) 
    });

    
    console.log('User logged out successfully');

    return response;
  } catch (error) {
    console.error('Logout Error:', {
      message: error.message,
      stack: error.stack
    });

    return NextResponse.json(
      { 
        message: 'Logout failed', 
        error: error.message,
        status: 'error'
      }, 
      { status: 500 }
    );
  }
}


export async function GET() {
  return NextResponse.json(
    { 
      message: 'Use POST method for logout',
      status: 'error'
    }, 
    { status: 405 }
  );
}