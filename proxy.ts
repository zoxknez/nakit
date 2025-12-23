import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['sr', 'ru', 'en'],
  defaultLocale: 'sr',
  localePrefix: 'always',
});

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for select-language page  
  if (pathname === '/select-language') {
    return NextResponse.next();
  }

  // Check if user is accessing root without locale
  if (pathname === '/') {
    // Check for saved locale in cookie
    const savedLocale = request.cookies.get('NEXT_LOCALE')?.value;
    
    // If no saved locale, redirect to language selector
    if (!savedLocale) {
      return NextResponse.redirect(new URL('/select-language', request.url));
    }
    
    // Redirect to saved locale
    return NextResponse.redirect(new URL(`/${savedLocale}`, request.url));
  }

  // Protect admin routes (will be enhanced with NextAuth)
  if (pathname.includes('/admin')) {
    return NextResponse.next();
  }

  // Handle locale-prefixed routes with next-intl
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/select-language', '/(sr|ru|en)/:path*', '/admin/:path*'],
};
