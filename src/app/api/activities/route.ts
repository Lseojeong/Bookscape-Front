import type { CreateActivityRequestBody, CreateActivityResponse } from '@/features/activity/types';
import { ACTIVITY_ERROR_MESSAGES } from '@/features/my-page/activity-form/constants/validation';
import { ApiError } from '@/shared/apis/apiError';
import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxyFetch } from '@/shared/apis/bff/proxy';

/**
 * ## 체험 등록 API (BFF)
 *
 * @description
 * 로그인한 사용자가 체험을 등록합니다.
 *
 * - Backend: `POST /{teamId}/activities`
 *
 * @returns 등록된 체험 (`CreateActivityResponse`)
 */
export const POST = createAuthorizedRoute<CreateActivityRequestBody>(async ({ body }) => {
  if (body?.title && body.title.length > 50) {
    throw new ApiError(400, ACTIVITY_ERROR_MESSAGES.TITLE_MAX_LENGTH);
  }
  return proxyFetch.post<CreateActivityResponse>('/activities', body);
});
