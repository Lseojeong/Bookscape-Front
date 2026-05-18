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
 * - 401: 세션 만료로 보고 `clearSession('expired')`
 * - `hasHydrated` 이후에만 실행합니다.
 */
export default function AuthSessionSync() {
  const hasHydrated = useUserStore((state) => state.hasHydrated);
  const accessTokenExpiresAt = useUserStore((state) => state.accessTokenExpiresAt);
  const setUser = useUserStore((state) => state.setUser);
  const clearSession = useUserStore((state) => state.clearSession);
  const didSyncRef = useRef(false);

  useEffect(() => {
    if (!hasHydrated) return;
    if (didSyncRef.current) return;
    didSyncRef.current = true;

    const sync = async () => {
      // 비로그인(또는 세션 정보 없음)이라면 불필요한 `/users/me` 호출을 하지 않습니다.
      if (!accessTokenExpiresAt) return;

      // 만료된 세션이면 서버 호출 없이 클라이언트 상태만 정리합니다.
      if (accessTokenExpiresAt <= Date.now()) {
        clearSession('expired');
        return;
      }

      try {
        const me = await getMe();
        if (me) setUser(me);
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          clearSession('expired');
          return;
        }
      }
    };

    void sync();
  }, [accessTokenExpiresAt, clearSession, hasHydrated, setUser]);

  return null;
}
