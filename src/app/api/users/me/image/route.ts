import type { CreateMyProfileImageUrlResponse } from '@/features/user/types';
import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxyFetch } from '@/shared/apis/bff/proxy';

/**
 * ## 프로필 이미지 URL 생성 API (BFF)
 *
 * @description
 * 로그인한 사용자의 프로필 이미지를 업로드하고, 접근 가능한 URL을 반환합니다.
 *
 * - Backend: `POST /{teamId}/users/me/image`
 * - 요청 본문: `multipart/form-data` (`image` 필드)
 *
 * @returns 생성된 프로필 이미지 URL (`CreateMyProfileImageUrlResponse`)
 */
export const POST = createAuthorizedRoute<FormData>(async ({ body }) => {
  return proxyFetch.post<CreateMyProfileImageUrlResponse>('/users/me/image', body, {
    isFormData: true,
  });
});
