import type {
  CancelMyReservationRequestBody,
  MyReservationItem,
} from '@/features/reservation/types';
import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxyFetch } from '@/shared/apis/bff/proxy';

/**
 * ## 내 예약 수정(취소) API (BFF)
 *
 * @description
 * 로그인한 사용자의 예약을 취소합니다.
 *
 * - Backend: `PATCH /{teamId}/my-reservations/{reservationId}`
 *
 * @param body `{ status: "canceled" }`
 * @returns 수정된 예약 (`MyReservationItem`)
 */
export const PATCH = createAuthorizedRoute<
  CancelMyReservationRequestBody,
  { reservationId: string }
>(async ({ params, body }) => {
  const reservationId = params!.reservationId;
  return proxyFetch.patch<MyReservationItem>(`/my-reservations/${reservationId}`, body);
});
