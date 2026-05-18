'use client';

import { useRouter } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/shallow';
import { getMe } from '@/features/user/apis';
import { ApiError } from '@/shared/apis/apiError';
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
  const clearSession = useUserStore((state) => state.clearSession);
  const didCheckRef = useRef(false);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!user) return;

    // NOTE: store에 user가 남아있지만 쿠키 세션이 만료/삭제된 경우를 방지합니다.
    if (didCheckRef.current) return;
    didCheckRef.current = true;

    const check = async () => {
      try {
        await getMe();
        router.replace('/');
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          clearSession('expired');
          return;
        }
        // 네트워크 등 기타 오류는 보수적으로 로그인 화면을 허용합니다.
        clearSession('expired');
      }
    };

    void check();
  }, [clearSession, hasHydrated, router, user]);

  if (!hasHydrated) return null;
  if (user) return null;
  return children;
}
