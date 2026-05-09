'use client';
import { useEffect, useRef } from 'react';
import { refreshAuthTokens } from '@/features/auth/apis';
import { ApiError } from '@/shared/apis/apiError';
import { useUserStore } from '@/shared/stores/userStore';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

// TODO : 토큰 재발급 테스트 후 시간 변경 필요!
const REFRESH_LIMIT = 29 * 60 * 1000; // 29분

/**
 * Access Token 만료 5분 전에 자동으로 토큰을 재발급하는 훅입니다.
 *
 * [동작 흐름]
 * 1. accessTokenExpiresAt 기준으로 만료 5분 전 delay 계산
 * 2. delay 후 refreshAuthTokens() 호출
 * 3. 성공: 새 만료 시각으로 setSession → useEffect 재실행 → 타이머 재예약
 * 4. 401/403: clearSession으로 세션 초기화 후 재로그인 유도
 */
export const useTokenRefresh = () => {
  const { showToast } = useToastStore();
  const user = useUserStore((state) => state.user);
  const setSession = useUserStore((state) => state.setSession);
  const accessTokenExpiresAt = useUserStore((state) => state.accessTokenExpiresAt);
  const clearSession = useUserStore((state) => state.clearSession);

  // 동시에 여러 재발급 요청이 발생하지 않도록 방지
  const isRefreshing = useRef(false);

  useEffect(() => {
    if (!accessTokenExpiresAt || !user) return;

    const now = Date.now();
    const remainingTime = accessTokenExpiresAt - now;

    // 만료 시각까지 남은 시간 - 5분
    const delay = remainingTime - REFRESH_LIMIT;
    console.log('60초 후 토큰 갱신');

    /** 토큰 재발급 요청 및 세션 갱신 */
    const refresh = async () => {
      if (isRefreshing.current) return;
      isRefreshing.current = true;

      try {
        const data = await refreshAuthTokens();
        const newExpiredAt = data?.accessTokenExpiresAt;

        if (newExpiredAt && user) {
          const currentUser = useUserStore.getState().user;
          if (currentUser) {
            // 기존 유저 정보를 유지하면서 만료 시간만 업데이트
            setSession({ user: currentUser, accessTokenExpiresAt: newExpiredAt });
            console.log('토큰 재발급 성공', currentUser);
          }
        }
      } catch (error) {
        if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
          clearSession('expired');
          showToast('warning', '로그인 시간이 만료되었습니다. 다시 로그인해 주세요.');
          return;
        }
      } finally {
        isRefreshing.current = false;
      }
    };

    // 만료 5분 미만으로 남았을 경우 즉시 재발급
    if (delay <= 0) {
      refresh();
      return;
    }
    // 만료 5분 전 시점에 재발급 예약
    const timer = setTimeout(refresh, delay);
    return () => clearTimeout(timer);
  }, [accessTokenExpiresAt, user, setSession, clearSession]);
};
