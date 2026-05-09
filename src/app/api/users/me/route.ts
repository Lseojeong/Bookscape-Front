import type { UpdateMyProfileRequestBody, UserResponse } from '@/features/user/types';
import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxyFetch } from '@/shared/apis/bff/proxy';

/**
 * ## 내 정보 조회 API (BFF)
 *
 * @description
 * 로그인한 사용자의 정보를 조회합니다.
 *
 * - Backend: `GET /{teamId}/users/me`
 *
 * - 인증이 필요한 API로, `createAuthorizedRoute`를 통해 access token 존재 여부를 검사합니다.
 * - 실제 데이터 조회는 `proxyFetch`가 백엔드 API(`/users/me`)로 요청을 전달하며,
 *   쿠키의 `accessToken`을 `Authorization: Bearer ...` 헤더로 주입합니다.
 *
 * @returns 사용자 정보 (`UserResponse`)
 */
export const GET = createAuthorizedRoute(async () => {
  return proxyFetch.get<UserResponse>('/users/me');
});

/**
 * ## 내 정보 수정 API (BFF)
 *
 * @description
 * 로그인한 사용자의 정보를 수정합니다.
 *
 * - Backend: `PATCH /{teamId}/users/me`
 *
 * - 인증이 필요한 API로, `createAuthorizedRoute`를 통해 access token 존재 여부를 검사합니다.
 * - 요청 본문은 JSON으로 파싱되며(`createAuthorizedRoute` 내부), `proxyFetch`를 통해
 *   백엔드 API(`/users/me`)로 전달됩니다.
 * - `proxyFetch`가 쿠키의 `accessToken`을 `Authorization: Bearer ...` 헤더로 주입합니다.
 *
 * @param body 수정할 사용자 정보 (`UpdateMyProfileRequestBody`)
 * @returns 수정된 사용자 정보 (`UserResponse`)
 */
export const PATCH = createAuthorizedRoute<UpdateMyProfileRequestBody>(
  async ({ accessToken, body }) => {
    void accessToken;
    return proxyFetch.patch<UserResponse>('/users/me', body);
  }
);
