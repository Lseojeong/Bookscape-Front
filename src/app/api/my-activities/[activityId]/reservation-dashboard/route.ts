import type { GetMyActivityReservationDashboardResponse } from '@/features/my-page/types';
import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxyFetch } from '@/shared/apis/bff/proxy';
import { requireParams } from '@/shared/apis/bff/requireParams';

/**
 * ## 내 체험 월별 예약 현황 조회 API (BFF)
 *
 * @description
 * 내 체험의 월별 예약 현황을 조회합니다.
 *
 * - Backend: `GET /{teamId}/my-activities/{activityId}/reservation-dashboard`
 *
 * @query year YYYY
 * @query month MM
 *
 * @returns 예약 현황 (`GetMyActivityReservationDashboardResponse`)
 */
export const GET = createAuthorizedRoute<unknown, { activityId: string }>(
  async ({ request, params }) => {
    const { activityId } = requireParams(params);
    const { search } = new URL(request.url);
    return proxyFetch.get<GetMyActivityReservationDashboardResponse>(
      `/my-activities/${activityId}/reservation-dashboard${search}`
    );
  }
);
