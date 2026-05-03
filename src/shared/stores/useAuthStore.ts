import { create } from 'zustand';

/**
 * 사용자 기본 정보 타입
 */
type User = {
  /** 사용자의 고유 식별자 (UUID) */
  id: number;
  /** 사용자 이메일 계정 */
  email: string;
  /** 사용자 닉네임 */
  nickname: string;
};

/**
 * 인증 관련 전역 상태 및 액션 객체 타입
 */
type AuthState = {
  /** 현재 로그인한 사용자 정보 (비로그인 시 null) */
  user: User | null;
  /** 액세스 토큰의 만료 시각 */
  expiresAt: number | null;
  /**
   * 사용자 정보와 만료 시각을 스토어에 저장
   * @param user - 저장할 사용자 객체
   * @param expiresAt - 토큰 만료 시각 (Timestamp)
   */
  setAuth: (user: User, expiresAt: number) => void;
  /**
   * 스토어에 저장된 인증 정보를 초기화(로그아웃 처리)
   */
  clearAuth: () => void;
};

/**
 * 인증 상태를 전역으로 관리하는 Zustand store입니다.
 *
 * @example
 * ```ts
 * // 저장
 * const { setAuth } = useAuthStore();
 * setAuth(user, expiresAt);
 *
 * // 사용
 * const { user } = useAuthStore();
 * ```
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  expiresAt: null,

  setAuth: (user, expiresAt) => set({ user, expiresAt }),
  clearAuth: () => set({ user: null, expiresAt: null }),
}));
