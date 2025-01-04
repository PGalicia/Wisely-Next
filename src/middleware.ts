import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = new URL(request.url).pathname;

  // Asynchronously retrieve cookies
  const authCookie = request.cookies.get('appSession');

  // Redirect to homepage when you are trying to go to the login page and you are already logged in
  if (authCookie && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect to login page when you are trying to go to the homepage but you aren't logged in
  if (!authCookie && pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Set pathName to be used in the header component
  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname); 

  return response;
}