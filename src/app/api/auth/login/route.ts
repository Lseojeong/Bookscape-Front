import { NextResponse } from 'next/server';
import { ApiError } from '@/shared/apis/apiError';
import { serverFetch } from '@/shared/apis/base/serverFetch';
import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from '@/shared/constants/auth';

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

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
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    // 필수 값 검증
    if (!email || !password) {
      return NextResponse.json({ message: '이메일과 비밀번호를 입력해주세요.' }, { status: 400 });
    }

    // 2. 로그인 API 호출
    const data = await serverFetch.post<LoginResponse>('/auth/login', {
      email,
      password,
    });

    // 로그인 실패
    if (!data?.accessToken || !data?.refreshToken) {
      return NextResponse.json({ message: '로그인에 실패했습니다.' }, { status: 401 });
    }

    // 응답 객체 생성 및 공통 쿠키 설정
    const response = NextResponse.json({ success: true });
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'strict' as const,
      path: '/',
    };

    // 3. accessToken 쿠키 저장
    response.cookies.set('accessToken', data.accessToken, {
      ...cookieOptions,
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });

    // 4. refreshToken 쿠키 저장
    response.cookies.set('refreshToken', data.refreshToken, {
      ...cookieOptions,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });

    return response;
  } catch (error) {
    console.error('[POST /api/auth/login]', error);

    if (error instanceof ApiError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    return NextResponse.json({ message: '서버 에러 발생' }, { status: 500 });
  }
}
