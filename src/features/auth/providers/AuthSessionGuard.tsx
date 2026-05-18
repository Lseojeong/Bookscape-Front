'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { isProtectedPath } from '@/features/auth/utils/path';
import { getMe } from '@/features/user/apis';
import { ApiError } from '@/shared/apis/apiError';
import { useUserStore } from '@/shared/stores/userStore';

/**
 * CSR 네비게이션 시점에 세션을 재확인하여,
 * 쿠키 만료/삭제로 store가 stale해진 경우 즉시 guest 상태로 교정합니다.
 *
 * - protected 경로에서만 동작합니다.
 * - 401이면 clearSession('expired')로 guest 상태를 복구합니다.
 */
export default function AuthSessionGuard() {
  const pathname = usePathname();
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

    const check = async () => {
      try {
        await getMe();
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          clearSession('expired');
          return;
        }
      }
    };

    void check();
  }, [accessTokenExpiresAt, clearSession, hasHydrated, pathname, user]);

  return null;
}
