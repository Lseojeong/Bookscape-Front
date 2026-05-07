const requireEnv = (key: string, value: string | undefined): string => {
  if (!value) throw new Error(`${key} is not defined. Please check your .env file.`);
  return value;
};

/** 접근하는 순간 검증 → 빌드 시에는 실행되지 않음 */
export const ENV = {
  /** 클라이언트 + 서버 공통 API 주소 */
  get API_BASE_URL() {
    return requireEnv('NEXT_PUBLIC_BASE_URL', process.env.NEXT_PUBLIC_BASE_URL);
  },

  /** 서버 전용 내부 API 주소 */
  get SERVER_API_URL() {
    return requireEnv('API_URL', process.env.API_URL);
  },

  /** 카카오 OAuth REST API 키 (서버 전용) */
  get KAKAO_REST_API_KEY() {
    return requireEnv('KAKAO_REST_API_KEY', process.env.KAKAO_REST_API_KEY);
  },

  /** 카카오 OAuth redirect uri (서버 전용) */
  get KAKAO_REDIRECT_URI() {
    return requireEnv('KAKAO_REDIRECT_URI', process.env.KAKAO_REDIRECT_URI);
  },
} as const;
