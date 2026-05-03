import { NextResponse } from 'next/server';
import { COMMON_MESSAGE } from '@/features/auth/constants/authMessage';

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

    // 네트워크 장애 에러
    return NextResponse.json({ message: COMMON_MESSAGE.ERROR.NETWORK }, { status: 500 });
  }
}
