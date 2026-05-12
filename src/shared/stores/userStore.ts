import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UserResponse } from '@/features/user/types';

/**
 * ## SessionEndReason
 *
 * @description
 * 세션이 종료된 이유를 구분하기 위한 타입입니다.
 * 로그아웃이 명시적인 행동에 의한 것인지, 세션 만료 등으로 인한 자동 로그아웃인지를 구분할 때 사용합니다.
 *
 * @property 'user' - 사용자가 로그아웃 버튼 클릭 등 명시적인 행동으로 로그아웃한 경우
 * @property 'expired' - 세션 만료 등으로 인해 자동 로그아웃된 경우
 */
type SessionEndReason = 'user' | 'expired';

/**
 * ### UserStore
 *
 * @description
 * 로그인한 사용자/세션 정보를 전역에서 관리하는 store입니다.
 * - 인증 상태는 `user`와 만료 시각을 기준으로 판단합니다.
 *
 * @remarks
 * - `persist`로 새로고침 후에도 `user`/`accessTokenExpiresAt`를 복원합니다.
 * - 복원된 값이 서버 세션을 보장하진 않으니, 앱 시작 시 `/users/me`로 한 번 교정합니다. (`AuthSessionSync`)
 * - `setUser`/`setSession`은 서버에서 최신 값을 받은 직후에만 호출합니다.
 * - 로그아웃/만료 처리는 `clearSession(reason)`으로 정리합니다.
 */
type UserStore = {
  /** 로그인한 사용자 정보 (비로그인 시 undefined) */
  user: UserResponse | undefined;
  /** accessToken 만료 시각 (ms timestamp) */
  accessTokenExpiresAt: number | undefined;
  /** 세션 종료 이유 수동 로그아웃(`user`) 또는 자동 로그아웃(`expired`) */
  sessionEndReason: SessionEndReason | undefined;
  /** persist hydration 완료 여부 (SSR → CSR 깜빡임 방지용) */
  hasHydrated: boolean;
  /** 인증 상태 변경(로그인/로그아웃)에 따른 페이지 전환이 진행 중인지 여부 */
  isAuthInProgress: boolean;

  /** 인증 상태 변경(로그인/로그아웃)에 따른 페이지 전환 설정 */
  setIsAuthInProgress: (isAuthInProgress: boolean) => void;
  /** 사용자 정보 설정 */
  setUser: (user: UserResponse) => void;
  /** 사용자 정보와 accessToken 만료 시각을 함께 설정 (로그인, 토큰 재발급 등) */
  setSession: (params: { user: UserResponse; accessTokenExpiresAt: number }) => void;
  /** 인증 세션을 종료하고 사용자 정보를 초기화 */
  clearSession: (reason: SessionEndReason) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
};

/**
 * ### useUserStore
 *
 * @description
 * - 사용자 인증 상태를 전역으로 관리하는 zustand hook입니다.
 * - (개발 환경에서) Redux DevTools 확장 프로그램이 설치되어 있으면 상태 변경을 추적할 수 있습니다.
 *
 * @example
 * ```ts
 * const user = useUserStore((state) => state.user);
 * const setUser = useUserStore((state) => state.setUser);
 * ```
 */
export const useUserStore = create<
  UserStore,
  [
    ['zustand/devtools', never],
    [
      'zustand/persist',
      {
        user: UserResponse | undefined;
        accessTokenExpiresAt: number | undefined;
      },
    ],
  ]
>(
  devtools(
    persist(
      (set) => ({
        user: undefined,
        accessTokenExpiresAt: undefined,
        sessionEndReason: undefined,
        hasHydrated: false,
        isAuthInProgress: false,
        setIsAuthInProgress: (value) =>
          set({ isAuthInProgress: value }, false, 'user/setIsAuthInProgress'),
        setUser: (user) => set({ user }, false, 'user/setUser'),
        setSession: ({ user, accessTokenExpiresAt }) =>
          set(
            { user, accessTokenExpiresAt, sessionEndReason: undefined },
            false,
            'user/setSession'
          ),
        clearSession: (reason) =>
          set(
            {
              user: undefined,
              accessTokenExpiresAt: undefined,
              sessionEndReason: reason,
            },
            false,
            'user/clearSession'
          ),
        setHasHydrated: (hasHydrated) => set({ hasHydrated }, false, 'user/setHasHydrated'),
      }),
      {
        name: 'user',
        /**
         * 새로고침 후에도 복원해야 하는 값만 저장합니다.
         * - 저장 위치: `localStorage['user']`
         * - 저장 값: `user`, `accessTokenExpiresAt`
         */
        partialize: (state) => ({
          user: state.user,
          accessTokenExpiresAt: state.accessTokenExpiresAt,
        }),
        /**
         * persist 복원이 끝났다는 신호입니다.
         * - 복원 완료 후 `hasHydrated`를 `true`로 올립니다.
         * - `/users/me` 같은 “앱 시작 동기화”는 이 시점 이후에 실행하는 걸 권장합니다.
         */
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      }
    ),
    { enabled: process.env.NODE_ENV === 'development' }
  )
);
