import type {
  MyReservationItem,
  UpdateMyReservationApplicationRequestBody,
} from '@/features/reservation/types';
import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxyFetch } from '@/shared/apis/bff/proxy';

/**
 * ## 체험 예약 신청 변경 API (BFF)
 *
 * @description
 * 로그인한 사용자의 예약 신청 정보를 변경합니다.
 *
 * - Backend: `PATCH /{teamId}/my-reservations/{reservationId}/application`
 *
 * @param body `{ scheduleId, headCount }`
 * @returns 수정된 예약 (`MyReservationItem`)
 */
export const PATCH = createAuthorizedRoute<
  UpdateMyReservationApplicationRequestBody,
  { reservationId: string }
>(async ({ params, body }) => {
  const reservationId = params!.reservationId;
  return proxyFetch.patch<MyReservationItem>(`/my-reservations/${reservationId}/application`, body);
});
