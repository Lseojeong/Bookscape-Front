import type {
  CreateActivityReservationRequestBody,
  MyReservationItem,
} from '@/features/reservation/types';
import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxyFetch } from '@/shared/apis/bff/proxy';
import { requireParams } from '@/shared/apis/bff/requireParams';

/**
 * ## 체험 예약 신청 API (BFF)
 *
 * @description
 * 로그인한 사용자가 체험 예약을 신청합니다.
 *
 * - Backend: `POST /{teamId}/activities/{activityId}/reservations`
 *
 * @returns 생성된 예약 (`MyReservationItem`)
 */
export const POST = createAuthorizedRoute<
  CreateActivityReservationRequestBody,
  { activityId: string }
>(async ({ params, body }) => {
  const { activityId } = requireParams(params);
  return proxyFetch.post<MyReservationItem>(`/activities/${activityId}/reservations`, body);
});
