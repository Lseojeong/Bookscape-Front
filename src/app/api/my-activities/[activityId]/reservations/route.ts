import type { GetMyActivityReservationsResponse } from '@/features/my-page/types';
import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxyFetch } from '@/shared/apis/bff/proxy';
import { requireParams } from '@/shared/apis/bff/requireParams';

/**
 * ## 내 체험 예약 시간대별 예약 내역 조회 API (BFF)
 *
 * @description
 * 내 체험의 예약 목록을 조회합니다. (커서 기반 페이지네이션)
 *
 * - Backend: `GET /{teamId}/my-activities/{activityId}/reservations`
 *
 * @query cursorId 커서 ID
 * @query size 페이지 크기 (기본 10)
 * @query scheduleId 스케줄 ID
 * @query status declined | pending | confirmed
 *
 * @returns 예약 내역 (`GetMyActivityReservationsResponse`)
 */
export const GET = createAuthorizedRoute<unknown, { activityId: string }>(
  async ({ request, params }) => {
    const { activityId } = requireParams(params);
    const { search } = new URL(request.url);
    return proxyFetch.get<GetMyActivityReservationsResponse>(
      `/my-activities/${activityId}/reservations${search}`
    );
  }
);
