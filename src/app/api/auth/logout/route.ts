import { NextResponse } from 'next/server';
import { AUTH_API_MESSAGE } from '@/features/auth/constants/authMessage';

/**
 * POST /api/auth/logout
 * 로그아웃 라우트 핸들러
 *
 * [동작 흐름]
 * 1. accessToken, refreshToken 쿠키를 삭제한다.
 *
 */
export async function POST() {
  try {
    const response = NextResponse.json({ success: true });

    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');

    return response;
  } catch (error) {
    console.error('[POST /api/auth/logout]', error);

    return NextResponse.json({ message: AUTH_API_MESSAGE.LOGOUT.ERROR }, { status: 500 });
  }
}
