import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_API_MESSAGE } from '@/features/auth/constants/authMessage';
import type { OauthAuthResponse, SignInWithOauthRequestBody } from '@/features/auth/types/oauth';
import {
  createOAuthSessionResponse,
  getRequiredKakaoRedirectUri,
} from '@/features/auth/utils/oauthSessionServer';
import { ApiError } from '@/shared/apis/apiError';
import { serverFetch } from '@/shared/apis/base/serverFetch';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SignInWithOauthRequestBody;

    const redirectUri = body.redirectUri ?? getRequiredKakaoRedirectUri();

    const data = await serverFetch.post<OauthAuthResponse>('/oauth/sign-in/kakao', {
      redirectUri,
      token: body.token,
    });

    if (!data) {
      return NextResponse.json({ message: 'OAUTH_SIGNIN_FAILED' }, { status: 500 });
    }

    return createOAuthSessionResponse({
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: AUTH_API_MESSAGE.OAUTH.KAKAO.SIGNIN.ERROR },
      { status: 500 }
    );
  }
}
