'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { isProtectedPath } from '@/features/auth/utils/path';
import { useUserStore } from '@/shared/stores/userStore';

/**
 * 세션 만료(`clearSession('expired')`)가 발생했을 때,
 * private 경로에서 로그인 페이지로 이동시켜 UX를 복구합니다.
 */
export default function AuthExpiredRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasHydrated = useUserStore((state) => state.hasHydrated);
  const sessionEndReason = useUserStore((state) => state.sessionEndReason);

  const didRedirectRef = useRef(false);

  useEffect(() => {
    if (!hasHydrated) return;
    if (sessionEndReason !== 'expired') return;
    if (!pathname) return;
    if (didRedirectRef.current) return;
    if (!isProtectedPath(pathname)) return;

    didRedirectRef.current = true;
    const search = searchParams?.toString();
    const redirect = `${pathname}${search ? `?${search}` : ''}`;

    router.replace(`/login?redirect=${encodeURIComponent(redirect)}`);
  }, [hasHydrated, pathname, router, searchParams, sessionEndReason]);

  return null;
}
