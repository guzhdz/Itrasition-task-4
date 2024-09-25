import { NextResponse } from 'next/server';

export function middleware(req) {
  const webRoute = req.cookies.get('webRoute');
  const userId = req.cookies.get('userId');

  if(req.nextUrl.pathname === '/' && userId?.value) {
    return NextResponse.redirect(new URL('/admin-panel', req.url));
  }

  if (req.nextUrl.pathname === '/confirm' && webRoute?.value !== 'confirm') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (req.nextUrl.pathname === '/admin-panel' && !userId?.value) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/confirm', '/admin-panel', '/'],
};