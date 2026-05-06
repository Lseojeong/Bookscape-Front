/**
 * 동적 라우트 handler에서 params를 안전하게 강제하기 위한 유틸리티입니다.
 * (createAuthorizedRoute의 ctx.params는 정적/동적 라우트 공용 시그니처를 위해 optional)
 */
export const requireParams = <T>(params: T | undefined): T => {
  if (!params) throw new Error('Route params are missing.');
  return params;
};
