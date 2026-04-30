import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { ENV } from '@/shared/apis/env';
import { serverFetch } from '@/shared/apis/serverFetch';

type RefreshResponse = {
  accessToken: string;
  refreshToken?: string;
};

/**
 * POST /api/auth/tokens
 * Access Token 재발급 라우트 핸들러입니다.
 *
 * [동작 흐름]
 * 1. HttpOnly 쿠키에 저장된 refreshToken을 가져온다.
 * 2. 해당 refreshToken을 사용하여 백엔드에 토큰 재발급을 요청한다.
 * 3. 재발급된 accessToken을 HttpOnly 쿠키로 저장한다.
 * 4. 새로운 refreshToken이 함께 내려온 경우, 기존 refreshToken을 갱신한다.
 *
 */
export async function POST() {
  try {
    // 1. HttpOnly 쿠키에서 refreshToken 꺼내기
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    // refreshToken이 없으면 재발급 불가 → 401 반환
    if (!refreshToken) {
      return NextResponse.json({ message: 'Refresh token이 없습니다.' }, { status: 401 });
    }

    // 2. 백엔드에 토큰 재발급 요청
    const data = await serverFetch.post<RefreshResponse>(ENV.SERVER_API_URL, '/auth/tokens', {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    // accessToken이 없으면 재발급 실패로 간주
    if (!data?.accessToken) {
      return NextResponse.json({ message: '토큰 재발급 실패' }, { status: 401 });
    }

    // 3. 새로운 accessToken을 쿠키에 저장
    const response = NextResponse.json({ success: true });
    response.cookies.set('accessToken', data.accessToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'lax',
    });

    // 4. refreshToken이 새로 내려온 경우 함께 갱신
    if (data.refreshToken) {
      response.cookies.set('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'lax',
      });
    }

    return response;
  } catch (error) {
    // 서버 또는 네트워크 에러
    console.error('[POST /api/auth/refresh]', error);
    return NextResponse.json({ message: '서버 에러 발생' }, { status: 500 });
  }
}
