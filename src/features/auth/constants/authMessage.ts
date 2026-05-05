export const COMMON_MESSAGE = {
  ERROR: {
    NETWORK: '네트워크 오류가 발생했습니다.',
  },
} as const;

// API 응답 메시지 (서버 → 클라이언트)
export const AUTH_API_MESSAGE = {
  LOGIN: {
    ERROR: '로그인에 실패했습니다.',
  },
  SIGNUP: {
    ERROR: '회원가입에 실패했습니다.',
  },
  OAUTH: {
    KAKAO: {
      SIGNIN: {
        ERROR: '카카오 로그인에 실패했습니다.',
      },
      SIGNUP: {
        ERROR: '카카오 회원가입에 실패했습니다.',
      },
    },
  },
  LOGOUT: {
    SUCCESS: '로그아웃 되었습니다.',
    ERROR: '로그아웃에 실패했습니다.',
  },
  TOKEN: {
    REFRESH_SUCCESS: '토큰 갱신에 성공했습니다.',
    REFRESH_ERROR: '토큰 갱신에 실패했습니다.',
  },
} as const;

// 클라이언트 상태 메시지 (UI/UX)
export const AUTH_CLIENT_MESSAGE = {
  SESSION_EXPIRED: '로그인 시간이 만료되었습니다. 다시 로그인해 주세요.',
  UNAUTHORIZED: '로그인이 필요합니다.',
} as const;
