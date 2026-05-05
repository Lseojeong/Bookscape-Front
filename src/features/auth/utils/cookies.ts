import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { COOKIE_OPTIONS } from '@/features/auth/constants/cookies';
import { getJwtMaxAge } from '@/features/auth/utils/jwt';

export type AuthToken = 'accessToken' | 'refreshToken';

/**
 * ## getAuthCookie
 *
 * @description
 * next cookies를 사용해서 쿠키에 저장된 토큰을 가져오는 함수
 *
 * @returns 토큰 문자열 / undefined
 */
export const getAuthCookie = async (token: AuthToken): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get(token)?.value;
};

interface SetAuthCookiesOptions {
  response: NextResponse;
  accessToken: string;
  refreshToken: string;
}

/**
 * ## setAuthCookies
 *
 * @description
 * 인증 과정에서 발급받은 access / refresh token을 HttpOnly Cookie로 설정하는 유틸 함수
 *
 * @param response - 쿠키를 설정할 `NextResponse` 객체
 * @param accessToken - 백엔드 인증 서버로부터 발급받은 access token
 * @param refreshToken - 백엔드 인증 서버로부터 발급받은 refresh token
 */
export const setAuthCookies = ({
  response,
  accessToken,
  refreshToken,
}: SetAuthCookiesOptions): void => {
  response.cookies.set('accessToken', accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: getJwtMaxAge(accessToken),
  });

  response.cookies.set('refreshToken', refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: getJwtMaxAge(refreshToken),
  });
};

/**
 * ## clearAuthCookies
 *
 * @description
 * next cookies를 사용해서 쿠키에 저장된 토큰을 삭제하는 함수
 */
export const clearAuthCookies = async (): Promise<void> => {
  const cookieStore = await cookies();

  cookieStore.set('accessToken', '', { ...COOKIE_OPTIONS, maxAge: 0 });

  cookieStore.set('refreshToken', '', { ...COOKIE_OPTIONS, maxAge: 0 });
};
