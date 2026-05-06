import { NextResponse } from 'next/server';
import { AUTH_API_MESSAGE } from '@/features/auth/constants/authMessage';
import { COOKIE_OPTIONS } from '@/features/auth/constants/cookies';
import { LoginResponse } from '@/features/auth/types/auth';
import { LoginFormValues } from '@/features/auth/utils/schema';
import { ApiError } from '@/shared/apis/apiError';
import { serverFetch } from '@/shared/apis/base/serverFetch';

/**
 * POST /api/auth/login
 * 로그인 라우트 핸들러입니다.
 *
 * [동작 흐름]
 * 1. 클라이언트로부터 이메일/비밀번호를 전달받는다.
 * 2. serverFetch를 통해 백엔드 /auth/login 호출
 * 3. 로그인 성공 시 accessToken, refreshToken을 전달받는다.
 * 4. 두 토큰을 HttpOnly 쿠키로 저장한다.
 *
 */
export async function POST(request: Request) {
  try {
    // 1. 클라이언트에서 전달한 로그인 정보 파싱
    const body: LoginFormValues = await request.json();
    const { email, password } = body;

    // 2. 로그인 API 호출
    const data = await serverFetch.post<LoginResponse>('/auth/login', {
      email,
      password,
    });

    // accessToken 또는 refreshToken이 정상적으로 내려오지 않은 경우
    if (!data?.accessToken || !data?.refreshToken) {
      return NextResponse.json({ message: AUTH_API_MESSAGE.LOGIN.ERROR }, { status: 500 });
    }

    // 토큰 만료 시간 계산 (현재 시간 기준 30분)
    const EXPIRE_TIME = 1000 * 60 * 30;
    const expiresAt = Date.now() + EXPIRE_TIME;

    // 응답 객체 생성 및 공통 쿠키 설정
    const response = NextResponse.json({ success: true, user: data.user, expiresAt: expiresAt });

    // 3. accessToken 쿠키 저장
    response.cookies.set('accessToken', data.accessToken, {
      ...COOKIE_OPTIONS,
    });

    // 4. refreshToken 쿠키 저장
    response.cookies.set('refreshToken', data.refreshToken, {
      ...COOKIE_OPTIONS,
    });

    return response;
  } catch (error) {
    console.error('[POST /api/auth/login]', error);

    if (error instanceof ApiError) {
      return NextResponse.json(
        { message: error.message || AUTH_API_MESSAGE.LOGIN.ERROR },
        { status: error.status }
      );
    }

    return NextResponse.json({ message: AUTH_API_MESSAGE.LOGIN.ERROR }, { status: 500 });
  }
}
