import { NextResponse } from 'next/server';
import type { OauthSessionResponseBody } from '@/features/auth/types/oauth';
import { setAuthCookies } from '@/features/auth/utils/cookies';
import { getJwtExpiresAt } from '@/features/auth/utils/jwt';
import type { UserResponse } from '@/features/user/types';
import { ENV } from '@/shared/apis/env';

/**
 * OAuth 로그인/회원가입 성공 시, 세션 쿠키를 설정한 뒤 응답 바디를 반환합니다.
 *
 * @remarks
 * 쿠키는 BFF에서 설정되며, 클라이언트에서는 이 응답을 기반으로 UI 상태를 동기화합니다.
 */
export const createOAuthSessionResponse = (params: {
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
}): NextResponse<OauthSessionResponseBody> => {
  const { user, accessToken, refreshToken } = params;

  const accessTokenExpiresAt = getJwtExpiresAt(accessToken);

  const response = NextResponse.json({ user, accessTokenExpiresAt });

  setAuthCookies({ response, accessToken, refreshToken });

  return response;
};

/**
 * 카카오 OAuth redirect uri를 환경변수에서 가져옵니다.
 *
 * @throws `KAKAO_REDIRECT_URI_NOT_SET` - `KAKAO_REDIRECT_URI`가 설정되지 않은 경우
 */
export const getRequiredKakaoRedirectUri = (): string => {
  return ENV.KAKAO_REDIRECT_URI;
};
