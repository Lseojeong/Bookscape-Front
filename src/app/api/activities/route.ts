import type { CreateActivityRequestBody, CreateActivityResponse } from '@/features/activity/types';
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
  return proxyFetch.post<CreateActivityResponse>('/activities', body);
});
