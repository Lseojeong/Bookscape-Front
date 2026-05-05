import { NextResponse } from 'next/server';
import { DEFAULT_OAUTH_MODE, isOAuthMode } from '@/features/auth/constants/oauthMode';
import type { OAuthMode } from '@/features/auth/constants/oauthMode';
import { ENV } from '@/shared/apis/env';

const KAKAO_OAUTH_AUTHORIZE_URL = 'https://kauth.kakao.com/oauth/authorize';

export function GET(request: Request) {
  const url = new URL(request.url);

  const oauthModeParam = url.searchParams.get('mode');
  const oauthMode: OAuthMode = isOAuthMode(oauthModeParam) ? oauthModeParam : DEFAULT_OAUTH_MODE;

  const clientId = ENV.KAKAO_REST_API_KEY;
  const redirectUri = ENV.KAKAO_REDIRECT_URI;

  const authorizeUrl = new URL(KAKAO_OAUTH_AUTHORIZE_URL);

  authorizeUrl.searchParams.set('response_type', 'code');
  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('state', oauthMode);

  return NextResponse.redirect(authorizeUrl.toString());
}
