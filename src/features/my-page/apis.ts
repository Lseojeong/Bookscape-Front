import type {
  GetMyActivityReservationDashboardResponse,
  GetMyActivityReservationDashboardQuery,
} from '@/features/my-page/types';
import { bffFetch } from '@/shared/apis/base/bffFetch';

/**
 * 내 체험 월별 예약 현황 조회
 *
 * @description `GET /api/my-activities/{activityId}/reservation-dashboard`
 * @param activityId - 체험 ID
 * @param query - 조회 연도 및 월 (`year`, `month`)
 * @returns 날짜별 예약 현황 목록
 */
export const getReservationDashboard = async (
  activityId: number,
  query: GetMyActivityReservationDashboardQuery
) => {
  const data = await bffFetch.get<GetMyActivityReservationDashboardResponse>(
    `/my-activities/${activityId}/reservation-dashboard`,
    query
  );
  return data ?? [];
};
