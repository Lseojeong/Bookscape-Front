import type { CreateActivityImageUrlResponse } from '@/features/activity/types';
import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxyFetch } from '@/shared/apis/bff/proxy';

/**
 * ## 체험 이미지 URL 생성 API (BFF)
 *
 * @description
 * 체험 등록/수정에 사용할 이미지를 업로드하고 URL을 반환합니다.
 *
 * - Backend: `POST /{teamId}/activities/image`
 * - 요청 본문: `multipart/form-data` (`image` 필드)
 *
 * @returns 업로드된 이미지 URL (`CreateActivityImageUrlResponse`)
 */
export const POST = createAuthorizedRoute<FormData>(async ({ body }) => {
  return proxyFetch.post<CreateActivityImageUrlResponse>('/activities/image', body, {
    isFormData: true,
  });
});
