// import { NextResponse } from 'next/server';
// import { verify } from 'jsonwebtoken';

// export async function middleware(request) {
//   const token = request.cookies.get('token')?.value;


//   const publicPaths = ['/login', '/register'];
//   if (publicPaths.includes(request.nextUrl.pathname)) {
//     if (token) {
//       try {
//         const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key');
//         return NextResponse.redirect(new URL(
//           decoded.role === 'admin' ? '/admin/dashboard' : '/user/dashboard',
//           request.url
//         ));
//       } catch (error) {
//         return NextResponse.next();
//       }
//     }
//     return NextResponse.next();
//   }

//   if (!token) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   try {
//     const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key');


//     if (request.nextUrl.pathname.startsWith('/admin') && decoded.role !== 'admin') {
//       return NextResponse.redirect(new URL('/user/dashboard', request.url));
//     }

//     if (request.nextUrl.pathname.startsWith('/user') && decoded.role !== 'user') {
//       return NextResponse.redirect(new URL('/admin/dashboard', request.url));
//     }

//     return NextResponse.next();
//   } catch (error) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
// }

// export const config = {
//   matcher: ['/login', '/register', '/admin/:path*', '/user/:path*']
// };

import { NextResponse } from 'next/server';

export async function middleware(request) {
  // no auth
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};