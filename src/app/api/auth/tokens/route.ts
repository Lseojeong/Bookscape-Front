import { NextResponse } from 'next/server';
import { AUTH_API_MESSAGE } from '@/features/auth/constants/authMessage';
import { RefreshResponse } from '@/features/auth/types/auth';
import { getAuthCookie, setAuthCookies } from '@/features/auth/utils/cookies';
import { getJwtExpiresAt } from '@/features/auth/utils/jwt';
import { ApiError } from '@/shared/apis/apiError';
import { serverFetch } from '@/shared/apis/base/serverFetch';

/**
 * POST /api/auth/tokens
 * Access Token 재발급 라우트 핸들러입니다.
 *
 * [동작 흐름]
 * 1. HttpOnly 쿠키에 저장된 refreshToken을 가져온다.
 * 2. refreshToken을 사용하여 백엔드에 토큰 재발급을 요청한다.
 * 3. 재발급된 accessToken을 HttpOnly 쿠키로 저장한다.
 * 4. 새로운 refreshToken으로 기존 refreshToken을 갱신한다.
 *
 */
export async function POST() {
  try {
    // 1. HttpOnly 쿠키에서 refreshToken 꺼내기
    const refreshToken = await getAuthCookie('refreshToken');

    if (!refreshToken) {
      return NextResponse.json({ message: AUTH_API_MESSAGE.TOKEN.REFRESH_ERROR }, { status: 401 });
    }

    // 2. 백엔드에 토큰 재발급 요청
    const data = await serverFetch.post<RefreshResponse>('/auth/tokens', undefined, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    // accessToken 또는 refreshToken이 정상적으로 내려오지 않은 경우
    if (!data?.accessToken || !data?.refreshToken) {
      return NextResponse.json({ message: AUTH_API_MESSAGE.TOKEN.REFRESH_ERROR }, { status: 401 });
    }

    const accessTokenExpiresAt = getJwtExpiresAt(data.accessToken);

    // 응답 객체 생성 및 공통 쿠키 설정
    const response = NextResponse.json({ success: true, accessTokenExpiresAt });

    setAuthCookies({ response, accessToken: data.accessToken, refreshToken: data.refreshToken });

    return response;
  } catch (error) {
    // 서버 또는 네트워크 에러
    if (error instanceof ApiError) {
      return NextResponse.json(
        { message: error.message || AUTH_API_MESSAGE.LOGIN.ERROR },
        { status: error.status }
      );
    }

    return NextResponse.json({ message: AUTH_API_MESSAGE.TOKEN.REFRESH_ERROR }, { status: 500 });
  }
}
