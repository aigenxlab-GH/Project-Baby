import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set('x-pathname', request.nextUrl.pathname);

  // Read Cloudflare's country header for geolocation-based affiliate link filtering
  const country = request.headers.get('cf-ipcountry') || 'US';
  response.cookies.set('country', country, {
    maxAge: 24 * 60 * 60,
    path: '/',
  });

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
