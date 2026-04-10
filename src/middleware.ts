import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split('/');
  const firstSegment = segments[1];

  // If the first segment looks like a language code but isn't supported, redirect to English
  if (firstSegment && /^[a-zA-Z]{2}(-[a-zA-Z]{2})?$/.test(firstSegment)) {
    if (!(routing.locales as readonly string[]).includes(firstSegment)) {
      segments[1] = routing.defaultLocale;
      const newUrl = request.nextUrl.clone();
      newUrl.pathname = segments.join('/');
      return NextResponse.redirect(newUrl);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|mac-license|download|.*\\..*).*)',
};
