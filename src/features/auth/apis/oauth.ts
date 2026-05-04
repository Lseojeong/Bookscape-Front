import type {
  OauthAppResponse,
  OauthSessionResponseBody,
  SignInWithOauthRequestBody,
  SignUpWithOauthRequestBody,
  UpsertOauthAppRequestBody,
} from '@/features/auth/types/oauth';
import { bffFetch } from '@/shared/apis/bffFetch';

/**
 * 간편 로그인 App 등록/수정 API (BFF)
 *
 * - Backend: `POST /{teamId}/oauth/apps`
 * - BFF: `POST /api/oauth/apps`
 */
export const registerOauthApp = (data: UpsertOauthAppRequestBody) => {
  return bffFetch.post<OauthAppResponse>('/oauth/apps', data);
};

/**
 * OAuth 기반 간편 회원가입 API (BFF)
 *
 * - Backend: `POST /{teamId}/oauth/sign-up/kakao`
 * - BFF: `POST /api/oauth/signup/kakao`
 */
export const signUpWithOauth = (data: SignUpWithOauthRequestBody) => {
  return bffFetch.post<OauthSessionResponseBody>('/oauth/signup/kakao', data);
};

/**
 * OAuth 기반 간편 로그인 API (BFF)
 *
 * - Backend: `POST /{teamId}/oauth/sign-in/kakao`
 * - BFF: `POST /api/oauth/signin/kakao`
 */
export const signInWithOauth = (data: SignInWithOauthRequestBody) => {
  return bffFetch.post<OauthSessionResponseBody>('/oauth/signin/kakao', data);
};
