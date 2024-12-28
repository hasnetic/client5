import { NextResponse } from 'next/server';
import { initDb } from '@/lib/db';
import User from '@/lib/models/user';

export async function GET(request) {
  try {
    console.log('🔍 API Route: Attempting to fetch users');
    
 
    await initDb();


    console.log('📋 Executing database query...');
    const users = await User.findAll({
      attributes: [
        'id', 
        'username', 
        'email', 
        'role', 
        'artype', 
        'createdAt', 
        'updatedAt'
      ],
      raw: true 
    });

   
    console.log('👥 Users fetched:', {
      count: users.length,
      firstUser: users[0] || 'No users found'
    });

    return new Response(JSON.stringify({ 
      users,
      count: users.length,
      status: 'success',
      message: 'Users fetched successfully'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
   
    console.error('❌ Detailed Fetch Error:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });


    return new Response(JSON.stringify({ 
      error: 'Failed to fetch users', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
