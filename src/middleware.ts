import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get('user');

  if (!userCookie) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/ms/:path*',
  ],
};