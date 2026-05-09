'use client';
import { ReactNode } from 'react';
import { useTokenRefresh } from '@/features/auth/hooks/useTokenRefresh';

type AuthTokenRefreshProviderProps = {
  children: ReactNode;
};

/**
 * Access Token 자동 재발급 기능을 전역으로 제공하는 컴포넌트입니다.
 * 로그인 상태에서 토큰이 만료되기 전에 자동으로 갱신합니다.
 */
export default function AuthTokenRefreshProvider({ children }: AuthTokenRefreshProviderProps) {
  useTokenRefresh();

  return <>{children}</>;
}
