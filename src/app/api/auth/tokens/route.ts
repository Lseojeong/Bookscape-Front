import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { serverFetch } from '@/shared/apis/base/serverFetch';

type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

// 쿠키 만료 시간
const ACCESS_TOKEN_MAX_AGE = 60 * 60; // 1시간
const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7일

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
      return NextResponse.json({ message: 'Refresh token이 없습니다.' }, { status: 401 });
    }

    // 2. 백엔드에 토큰 재발급 요청
    const data = await serverFetch.post<RefreshResponse>('/auth/tokens', undefined, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    // accessToken이 없으면 재발급 실패
    if (!data?.accessToken) {
      return NextResponse.json({ message: '토큰 재발급 실패' }, { status: 401 });
    }

    // 응답 객체 생성 및 공통 쿠키 설정
    const response = NextResponse.json({ success: true });
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'strict' as const,
      path: '/',
    };

    // 3. accessToken 갱신
    response.cookies.set('accessToken', data.accessToken, {
      ...cookieOptions,
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });

    // 4. refreshToken 갱신
    response.cookies.set('refreshToken', data.refreshToken, {
      ...cookieOptions,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });

    return response;
  } catch (error) {
    // 서버 또는 네트워크 에러
    console.error('[POST /api/auth/tokens]', error);
    return NextResponse.json({ message: '서버 에러 발생' }, { status: 500 });
  }
}
