'use client';

import { useRouter } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { useUserStore } from '@/shared/stores/userStore';

/**
 * 로그인/회원가입 페이지에서 사용하는 Guest 가드입니다.
 * - 로그인한 사용자는 접근 불가 → 홈으로 리다이렉트
 * - persist hydration 전에는 깜빡임 방지를 위해 렌더링을 보류합니다.
 */
export default function GuestGuard({ children }: PropsWithChildren) {
  const router = useRouter();
  const { user, hasHydrated } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      hasHydrated: state.hasHydrated,
    }))
  );

  useEffect(() => {
    if (!hasHydrated) return;
    if (!user) return;
    router.replace('/');
    router.refresh();
  }, [hasHydrated, router, user]);

  if (!hasHydrated) return null;
  if (user) return null;
  return children;
}
