import { NextResponse } from 'next/server';
import type { OauthSessionResponseBody } from '@/features/auth/types/oauth';
import { setAuthCookies } from '@/features/auth/utils/cookies';
import { getJwtExpiresAt } from '@/features/auth/utils/jwt';
import type { UserResponse } from '@/features/user/types';

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

export const getRequiredKakaoRedirectUri = (): string => {
  const redirectUri = process.env.KAKAO_REDIRECT_URI;
  if (!redirectUri) {
    throw new Error('KAKAO_REDIRECT_URI_NOT_SET');
  }
  return redirectUri;
};
