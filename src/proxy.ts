import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const ACCESS_TOKEN_COOKIE_KEY = 'accessToken';

const decodeBase64Url = (value: string): string => {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padLength = (4 - (base64.length % 4)) % 4;
  const padded = base64 + '='.repeat(padLength);

  return new TextDecoder().decode(Uint8Array.from(atob(padded), (c) => c.charCodeAt(0)));
};

const getJwtExpiresAtMs = (token: string): number | undefined => {
  const parts = token.split('.');
  if (parts.length < 2) return undefined;

  try {
    const payloadJson = decodeBase64Url(parts[1]);
    const payload = JSON.parse(payloadJson) as { exp?: number };

    if (!payload?.exp) return undefined;

    return payload.exp * 1000;
  } catch {
    return undefined;
  }
};

const normalizePathname = (pathname: string): string => {
  if (pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
};

const isAuthPath = (pathname: string) => pathname === '/login' || pathname === '/signup';

const isProtectedPath = (pathname: string) => {
  if (pathname.startsWith('/mypage')) return true;
  if (pathname.startsWith('/activity/new')) return true;
  if (/^\/activity\/[^/]+\/edit(\/.*)?$/.test(pathname)) return true;

  return false;
};

export const proxy = (request: NextRequest) => {
  const pathname = normalizePathname(request.nextUrl.pathname);
  const { search } = request.nextUrl;

  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE_KEY)?.value;
  const accessTokenExpiresAtMs = accessToken ? getJwtExpiresAtMs(accessToken) : undefined;

  const isExpired = accessTokenExpiresAtMs !== undefined && accessTokenExpiresAtMs <= Date.now();

  const isLoggedIn = Boolean(accessToken) && !isExpired;

  // 로그인한 사용자는 로그인/회원가입 페이지로 접근하지 못하도록 처리
  if (isLoggedIn && isAuthPath(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.delete('redirect');

    return NextResponse.redirect(url);
  }

  // 비로그인 사용자는 private 영역 접근 시 로그인 페이지로 리다이렉트
  if (!isLoggedIn && isProtectedPath(pathname)) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('redirect', `${pathname}${search}`);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/mypage/:path*',
    '/activity/new',
    '/activity/new/:path*',
    '/activity/:id/edit',
    '/activity/:id/edit/:path*',
    '/login',
    '/signup',
  ],
};
