export const ENV = {
  // 클라이언트 + 서버 공통 (외부 접근 가능한 API)
  API_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ?? '',

  // 서버 전용
  SERVER_API_URL: process.env.API_URL ?? '',
} as const;
if (!ENV.API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_BASE_URL is not defined. Please check your .env file.');
}
