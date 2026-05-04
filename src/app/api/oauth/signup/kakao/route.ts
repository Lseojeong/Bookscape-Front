import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { OauthAuthResponse, SignUpWithOauthRequestBody } from '@/features/auth/types/oauth';
import {
  createOAuthSessionResponse,
  getRequiredKakaoRedirectUri,
} from '@/features/auth/utils/oauthSession';
import { ApiError } from '@/shared/apis/apiError';
import { serverFetch } from '@/shared/apis/serverFetch';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SignUpWithOauthRequestBody;

    const redirectUri = body.redirectUri ?? getRequiredKakaoRedirectUri();

    const data = await serverFetch.post<OauthAuthResponse>('/oauth/sign-up/kakao', {
      nickname: body.nickname,
      redirectUri,
      token: body.token,
    });

    if (!data) {
      return NextResponse.json({ message: 'OAUTH_SIGNUP_FAILED' }, { status: 500 });
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
    return NextResponse.json({ message: '카카오 회원가입에 실패했습니다.' }, { status: 500 });
  }
}
