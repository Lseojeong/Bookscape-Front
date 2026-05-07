'use client';

import { useEffect, useRef } from 'react';
import { getMe } from '@/features/user/apis';
import { ApiError } from '@/shared/apis/apiError';
import { useUserStore } from '@/shared/stores/userStore';

/**
 * 새로고침/첫 진입 때 `/users/me`로 “지금도 로그인 상태인지” 서버에 확인하고 `userStore`를 맞춥니다.
 *
 * - `persist`로 복원된 `user`는 오래된 값일 수 있어 서버 확인이 필요합니다.
 * - 성공: `setUser(me)`
 * - 401/403: 세션 만료로 보고 `clearSession('expired')`
 * - `hasHydrated` 이후에만 실행합니다.
 */
export default function AuthSessionSync() {
  const hasHydrated = useUserStore((state) => state.hasHydrated);
  const setUser = useUserStore((state) => state.setUser);
  const clearSession = useUserStore((state) => state.clearSession);
  const didSyncRef = useRef(false);

  useEffect(() => {
    if (!hasHydrated) return;
    if (didSyncRef.current) return;
    didSyncRef.current = true;

    const sync = async () => {
      try {
        const me = await getMe();
        if (me) setUser(me);
      } catch (error) {
        if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
          clearSession('expired');
          return;
        }
      }
    };

    void sync();
  }, [clearSession, hasHydrated, setUser]);

  return null;
}
