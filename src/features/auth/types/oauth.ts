import type { UserResponse } from '@/features/user/types';

export type OauthProvider = 'kakao';

export interface UpsertOauthAppRequestBody {
  appKey: string;
  provider: OauthProvider;
}

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

export type OauthAppResponse = {
  createdAt: string;
  updatedAt: string;
  appKey: string;
  provider: string;
  teamId: string;
  id: number;
};

export type OauthSessionResponseBody = {
  user: UserResponse;
  accessTokenExpiresAt: number;
};
