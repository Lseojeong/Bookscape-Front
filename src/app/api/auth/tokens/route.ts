import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { bffFetch } from '@/shared/apis/bffFetch';
import { ENV } from '@/shared/apis/env';

type RefreshResponse = {
  accessToken: string;
  refreshToken?: string;
};

export async function POST() {
  try {
    // 1. 쿠키에서 refreshToken 꺼내기
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json({ message: 'Refresh token이 없습니다.' }, { status: 401 });
    }

    // 2. 백엔드 API에 토큰 재발급 요청
    const data = await bffFetch.post<RefreshResponse>(ENV.SERVER_API_URL, '/auth/tokens', {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

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

    // 4. refreshToken도 새로 내려오면 업데이트
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
    console.error('[POST /api/auth/refresh]', error);
    return NextResponse.json({ message: '서버 에러 발생' }, { status: 500 });
  }
}
