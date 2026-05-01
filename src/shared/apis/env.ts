// export const ENV = {
//   // 클라이언트 + 서버 공통 (외부 접근 가능한 API)
//   API_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ?? '',

//   // 서버 전용
//   SERVER_API_URL: process.env.API_URL ?? '',
// } as const;
// if (!ENV.API_BASE_URL) {
//   throw new Error('NEXT_PUBLIC_BASE_URL is not defined. Please check your .env file.');
// }

function requireEnv(key: string, value: string | undefined): string {
  if (!value) throw new Error(`${key} is not defined. Please check your .env file.`);
  return value;
}

export const ENV = {
  // 접근하는 순간 검증 → 빌드 시에는 실행되지 않음
  get API_BASE_URL() {
    return requireEnv('NEXT_PUBLIC_BASE_URL', process.env.NEXT_PUBLIC_BASE_URL);
  },
  get SERVER_API_URL() {
    return requireEnv('API_URL', process.env.API_URL);
  },
} as const;
