import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = isProduction
  ? [
      'https://linksbuddy.org',
      'http://localhost:3000',
      'https://github.com',
      'https://google.com',
    ]
  : [
      'http://localhost:3000',
      'https://github.com',
      'https://google.com',
    ];

export function middleware(req: NextRequest) {
  const origin = req.headers.get('origin') || '';
  const res = NextResponse.next();

  if (
    allowedOrigins.some((allowed) => origin.includes(allowed)) ||
    (!isProduction && allowedOrigins.includes('*'))
  ) {
    res.headers.set('Access-Control-Allow-Origin', origin);
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    res.headers.set(
      'Access-Control-Allow-Methods',
      'GET,DELETE,PATCH,POST,PUT,OPTIONS'
    );
    res.headers.set(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
  }

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: res.headers });
  }

  return res;
}

export const config = {
  matcher: '/api/:path*',
};
