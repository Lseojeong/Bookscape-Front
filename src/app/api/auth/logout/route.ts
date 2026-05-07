import { NextResponse } from 'next/server';
import { AUTH_API_MESSAGE } from '@/features/auth/constants/authMessage';
import { clearAuthCookiesOnResponse } from '@/features/auth/utils/cookies';

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
    clearAuthCookiesOnResponse(response);

    return response;
  } catch {
    return NextResponse.json({ message: AUTH_API_MESSAGE.LOGOUT.ERROR }, { status: 500 });
  }
}
