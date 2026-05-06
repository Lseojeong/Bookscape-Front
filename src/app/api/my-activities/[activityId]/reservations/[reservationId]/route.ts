import type {
  UpdateMyActivityReservationStatusRequestBody,
  UpdateMyActivityReservationStatusResponse,
} from '@/features/my-page/types';
import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxyFetch } from '@/shared/apis/bff/proxy';
import { requireParams } from '@/shared/apis/bff/requireParams';

/**
 * ## 내 체험 예약 상태 업데이트 API (BFF)
 *
 * @description
 * 내 체험 예약 상태(승인/거절)를 업데이트합니다.
 *
 * - Backend: `PATCH /{teamId}/my-activities/{activityId}/reservations/{reservationId}`
 *
 * @param body `{ status: "declined" | "pending" | "confirmed" }`
 * @returns 수정된 예약 (`UpdateMyActivityReservationStatusResponse`)
 */
export const PATCH = createAuthorizedRoute<
  UpdateMyActivityReservationStatusRequestBody,
  { activityId: string; reservationId: string }
>(async ({ params, body }) => {
  const { activityId, reservationId } = requireParams(params);
  return proxyFetch.patch<UpdateMyActivityReservationStatusResponse>(
    `/my-activities/${activityId}/reservations/${reservationId}`,
    body
  );
});
