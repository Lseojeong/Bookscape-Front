import type { UserResponse } from '@/features/user/types';

export type OauthProvider = 'kakao';

export interface SignInWithOauthRequestBody {
  redirectUri?: string;
  token: string;
}

export type SignUpWithOauthRequestBody = SignInWithOauthRequestBody & {
  nickname: string;
};

export type OauthAuthResponse = {
  user: UserResponse;
  refreshToken: string;
  accessToken: string;
};

export type OauthSessionResponseBody = {
  user: UserResponse;
  accessTokenExpiresAt: number;
};
