import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { AUTH_API_MESSAGE, COMMON_MESSAGE } from '@/features/auth/constants/authMessage';
import { COOKIE_OPTIONS } from '@/features/auth/constants/cookies';
import { RefreshResponse } from '@/features/auth/types';
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
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

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

    // 응답 객체 생성 및 공통 쿠키 설정
    const response = NextResponse.json({ success: true });

    // 3. accessToken 갱신
    response.cookies.set('accessToken', data.accessToken, {
      ...COOKIE_OPTIONS,
    });

    // 4. refreshToken 갱신
    response.cookies.set('refreshToken', data.refreshToken, {
      ...COOKIE_OPTIONS,
    });

    return response;
  } catch (error) {
    // 서버 또는 네트워크 에러
    console.error('[POST /api/auth/tokens]', error);

    if (error instanceof ApiError) {
      return NextResponse.json(
        { message: error.message || AUTH_API_MESSAGE.LOGIN.ERROR },
        { status: error.status }
      );
    }

    // 네트워크 장애 에러
    return NextResponse.json({ message: COMMON_MESSAGE.ERROR.NETWORK }, { status: 500 });
  }
}
