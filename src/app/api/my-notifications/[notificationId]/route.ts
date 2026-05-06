import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxyFetch } from '@/shared/apis/bff/proxy';
import { requireParams } from '@/shared/apis/bff/requireParams';

/**
 * ## 내 알림 삭제 API (BFF)
 *
 * @description
 * 로그인한 사용자의 알림을 삭제합니다.
 *
 * - Backend: `DELETE /{teamId}/my-notifications/{notificationId}`
 *
 * @returns 204 No Content
 */
export const DELETE = createAuthorizedRoute<unknown, { notificationId: string }>(
  async ({ params }) => {
    const { notificationId } = requireParams(params);
    await proxyFetch.delete(`/my-notifications/${notificationId}`);
    return undefined;
  }
);
