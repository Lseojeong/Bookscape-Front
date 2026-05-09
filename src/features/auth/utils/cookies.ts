import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { COOKIE_OPTIONS } from '@/features/auth/constants/cookies';
import { LOGIN_METHOD_COOKIE_KEY, type LoginMethod } from '@/features/auth/constants/loginMethod';
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

interface SetLoginMethodCookieParams {
  response: NextResponse;
  loginMethod: LoginMethod;
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
 * Route Handler에서 응답 객체에 access/refresh 토큰 쿠키를 만료시키는 유틸 함수
 *
 * @param response - 쿠키를 만료시킬 `NextResponse` 객체
 */
export const clearAuthCookies = (response: NextResponse): void => {
  response.cookies.set('accessToken', '', { ...COOKIE_OPTIONS, maxAge: 0 });
  response.cookies.set('refreshToken', '', { ...COOKIE_OPTIONS, maxAge: 0 });
};

/**
 * ## setLoginMethodCookie
 *
 * @description
 * 로그인 방식을 구분하기 위한 쿠키를 설정하는 유틸 함수입니다.
 *
 * @param params - response 객체와 로그인 방식(auth/oauth)
 * @example
 * setLoginMethodCookie({ response, loginMethod: 'auth' });
 */
export const setLoginMethodCookie = (params: SetLoginMethodCookieParams): void => {
  const { response, loginMethod } = params;
  response.cookies.set(LOGIN_METHOD_COOKIE_KEY, loginMethod, COOKIE_OPTIONS);
};

/**
 * ## clearLoginMethodCookie
 *
 * @description
 * 로그인 방식 쿠키를 만료시키는 유틸 함수입니다.
 *
 * @param response - 쿠키를 만료시킬 `NextResponse` 객체
 * @example
 * clearLoginMethodCookie(response);
 */
export const clearLoginMethodCookie = (response: NextResponse): void => {
  response.cookies.set(LOGIN_METHOD_COOKIE_KEY, '', { ...COOKIE_OPTIONS, maxAge: 0 });
};
