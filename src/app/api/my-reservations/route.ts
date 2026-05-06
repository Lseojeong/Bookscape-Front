import type { GetMyReservationsResponse } from '@/features/reservation/types';
import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxyFetch } from '@/shared/apis/bff/proxy';

/**
 * ## 내 예약 리스트 조회 API (BFF)
 *
 * @description
 * 로그인한 사용자의 예약 내역을 조회합니다. (커서 기반 페이지네이션)
 *
 * - Backend: `GET /{teamId}/my-reservations`
 *
 * @query cursorId 커서 ID
 * @query size 페이지 크기 (기본 10)
 * @query status 예약 상태 필터
 *
 * @returns 내 예약 리스트 (`GetMyReservationsResponse`)
 */
export const GET = createAuthorizedRoute(async ({ request }) => {
  const { search } = new URL(request.url);
  return proxyFetch.get<GetMyReservationsResponse>(`/my-reservations${search}`);
});
