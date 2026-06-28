import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Read Cloudflare's country header
  const country = request.headers.get('cf-ipcountry') || 'US';

  // Set country cookie (expires in 24 hours)
  response.cookies.set('country', country, {
    maxAge: 24 * 60 * 60,
    path: '/',
  });

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
