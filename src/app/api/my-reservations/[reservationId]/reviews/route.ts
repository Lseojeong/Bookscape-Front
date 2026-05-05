import type {
  CreateMyReservationReviewRequestBody,
  CreateMyReservationReviewResponse,
} from '@/features/reservation/types';
import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxyFetch } from '@/shared/apis/bff/proxy';

/**
 * ## 내 예약 리뷰 작성 API (BFF)
 *
 * @description
 * 로그인한 사용자가 예약에 대한 리뷰를 작성합니다.
 *
 * - Backend: `POST /{teamId}/my-reservations/{reservationId}/reviews`
 *
 * @param body `{ rating, content }`
 * @returns 생성된 리뷰 (`CreateMyReservationReviewResponse`)
 */
export const POST = createAuthorizedRoute<
  CreateMyReservationReviewRequestBody,
  { reservationId: string }
>(async ({ params, body }) => {
  const reservationId = params!.reservationId;
  return proxyFetch.post<CreateMyReservationReviewResponse>(
    `/my-reservations/${reservationId}/reviews`,
    body
  );
});
