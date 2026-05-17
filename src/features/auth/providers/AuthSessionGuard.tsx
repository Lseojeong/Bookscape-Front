'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { getMe } from '@/features/user/apis';
import { ApiError } from '@/shared/apis/apiError';
import { useUserStore } from '@/shared/stores/userStore';

const isProtectedPath = (pathname: string) => {
  if (pathname.startsWith('/mypage')) return true;
  if (pathname.startsWith('/activity/new')) return true;
  if (/^\/activity\/[^/]+\/edit(\/.*)?$/.test(pathname)) return true;
  return false;
};

/**
 * CSR 네비게이션 시점에 세션을 재확인하여,
 * 쿠키 만료/삭제로 store가 stale해진 경우 즉시 guest 상태로 교정합니다.
 *
 * - protected 경로에서만 동작합니다.
 * - 401/403이면 clearSession('expired') 후 로그인으로 이동합니다.
 */
export default function AuthSessionGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasHydrated = useUserStore((state) => state.hasHydrated);
  const user = useUserStore((state) => state.user);
  const accessTokenExpiresAt = useUserStore((state) => state.accessTokenExpiresAt);
  const clearSession = useUserStore((state) => state.clearSession);

  const lastCheckedPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!pathname) return;
    if (!isProtectedPath(pathname)) return;
    if (!user || !accessTokenExpiresAt) return;
    if (lastCheckedPathRef.current === pathname) return;
    lastCheckedPathRef.current = pathname;

    const search = searchParams?.toString();
    const redirect = `${pathname}${search ? `?${search}` : ''}`;

    const check = async () => {
      try {
        await getMe();
      } catch (error) {
        if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
          clearSession('expired');
          router.replace(`/login?redirect=${encodeURIComponent(redirect)}`);
          return;
        }
      }
    };

    void check();
  }, [accessTokenExpiresAt, clearSession, hasHydrated, pathname, router, searchParams, user]);

  return null;
}
