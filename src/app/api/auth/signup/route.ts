import { NextResponse } from 'next/server';
import { AUTH_API_MESSAGE } from '@/features/auth/constants/authMessage';
import { SignupRequestBody } from '@/features/auth/types/auth';
import { SignupFormValues } from '@/features/auth/utils/schema';
import { ApiError } from '@/shared/apis/apiError';
import { serverFetch } from '@/shared/apis/base/serverFetch';

export async function POST(request: Request) {
  try {
    // 1. 클라이언트에서 전달한 회원가입 정보 파싱
    const body: SignupFormValues = await request.json();
    const { email, nickname, password } = body;

    // 2. 회원가입 API 호출
    const data = await serverFetch.post<SignupRequestBody>('/users', {
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
