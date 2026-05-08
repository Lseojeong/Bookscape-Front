import { NextResponse } from 'next/server';
import { AUTH_API_MESSAGE } from '@/features/auth/constants/authMessage';
import { SignupFormValues } from '@/features/auth/utils/schema';
import { UserResponse } from '@/features/user/types';
import { ApiError } from '@/shared/apis/apiError';
import { serverFetch } from '@/shared/apis/base/serverFetch';

/**
 * POST /api/auth/signup
 * 회원가입 라우트 핸들러입니다.
 *
 * [동작 흐름]
 * 1. 클라이언트에서 전달한 회원가입 정보를 파싱한다.
 * 2. passwordConfirm을 제외한 필드만 백엔드 API에 전달한다.
 * 3. 성공 시 201 응답을 반환한다.
 *
 */
export async function POST(request: Request) {
  try {
    // 1. 클라이언트에서 전달한 회원가입 정보 파싱
    // passwordConfirm은 클라이언트 유효성 검사용이므로 구조 분해 시 제외
    const body: SignupFormValues = await request.json();
    const { email, nickname, password } = body;

    // 2. 회원가입 API 호출
    const data = await serverFetch.post<UserResponse>('/users', {
      email,
      nickname,
      password,
    });

    if (!data) {
      return NextResponse.json({ message: AUTH_API_MESSAGE.SIGNUP.ERROR }, { status: 500 });
    }

    return NextResponse.json({ message: AUTH_API_MESSAGE.SIGNUP.SUCCESS }, { status: 201 });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: AUTH_API_MESSAGE.SIGNUP.ERROR }, { status: 500 });
  }
}
