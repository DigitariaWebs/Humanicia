import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle source map requests to prevent 404 errors
  if (pathname.endsWith('.map') || pathname.includes('installHook.js.map')) {
    // Log the request for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Middleware] Handling source map request: ${pathname}`);
    }

    // Handle OPTIONS requests for CORS preflight
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    const emptySourceMap = {
      version: 3,
      sources: [],
      names: [],
      mappings: '',
    };

    return new NextResponse(JSON.stringify(emptySourceMap), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all requests ending with .map or containing installHook
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
