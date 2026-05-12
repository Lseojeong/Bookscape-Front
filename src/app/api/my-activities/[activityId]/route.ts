import { ACTIVITY_ERROR_MESSAGES } from '@/features/my-page/activity-form/common/constants/validation';
import type {
  UpdateMyActivityRequestBody,
  UpdateMyActivityResponse,
} from '@/features/my-page/activity-form/types';
import { ApiError } from '@/shared/apis/apiError';
import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxyFetch } from '@/shared/apis/bff/proxy';
import { requireParams } from '@/shared/apis/bff/requireParams';

/**
 * ## 내 체험 삭제 API (BFF)
 *
 * @description
 * 로그인한 사용자의 체험을 삭제합니다.
 *
 * - Backend: `DELETE /{teamId}/my-activities/{activityId}`
 *
 * @returns 204 No Content
 */
export const DELETE = createAuthorizedRoute<unknown, { activityId: string }>(async ({ params }) => {
  const { activityId } = requireParams(params);
  await proxyFetch.delete(`/my-activities/${activityId}`);
  return undefined;
});

/**
 * ## 내 체험 수정 API (BFF)
 *
 * @description
 * 로그인한 사용자의 체험을 수정합니다.
 *
 * - Backend: `PATCH /{teamId}/my-activities/{activityId}`
 *
 * @returns 수정된 체험 (`UpdateMyActivityResponse`)
 */
export const PATCH = createAuthorizedRoute<UpdateMyActivityRequestBody, { activityId: string }>(
  async ({ params, body }) => {
    const { activityId } = requireParams(params);
    if (body?.title && body.title.length > 50) {
      throw new ApiError(400, ACTIVITY_ERROR_MESSAGES.TITLE_MAX_LENGTH);
    }
    return proxyFetch.patch<UpdateMyActivityResponse>(`/my-activities/${activityId}`, body);
  }
);
