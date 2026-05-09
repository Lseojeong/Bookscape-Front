import type {
  GetMyActivitiesQuery,
  GetMyActivitiesResponse,
  GetMyActivityReservationDashboardResponse,
  GetMyActivityReservationDashboardQuery,
  GetMyActivityReservedScheduleResponse,
  GetMyActivityReservationsQuery,
  GetMyActivityReservationsResponse,
} from '@/features/my-page/types';
import { bffFetch } from '@/shared/apis/base/bffFetch';
/**
 * 내 체험 리스트 조회
 *
 * @description `GET /api/my-activities`
 * @param query - 커서 ID, 페이지 크기
 * @returns 내 체험 리스트
 */
export const getMyActivities = async (query?: GetMyActivitiesQuery) => {
  const data = await bffFetch.get<GetMyActivitiesResponse>('/my-activities', query);
  return data ?? { cursorId: 0, totalCount: 0, activities: [] };
};
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

/**
 * 내 체험 날짜별 예약 정보가 있는 스케줄 조회
 *
 * @description `GET /api/my-activities/{activityId}/reserved-schedule`
 * @param activityId - 체험 ID
 * @param date - 조회 날짜 (`YYYY-MM-DD`)
 * @returns 스케줄 목록
 */
export const getReservedSchedule = async (activityId: number, date: string) => {
  const data = await bffFetch.get<GetMyActivityReservedScheduleResponse>(
    `/my-activities/${activityId}/reserved-schedule`,
    { date }
  );
  return data ?? [];
};

/**
 * 내 체험 예약 목록 조회
 *
 * @description `GET /api/my-activities/{activityId}/reservations`
 * @param activityId - 체험 ID
 * @param query - 스케줄 ID, 상태, 커서 ID, 페이지 크기
 * @returns 예약 목록
 */
export const getMyActivityReservations = async (
  activityId: number,
  query: GetMyActivityReservationsQuery
) => {
  const data = await bffFetch.get<GetMyActivityReservationsResponse>(
    `/my-activities/${activityId}/reservations`,
    query as Record<string, string | number | boolean | undefined>
  );
  return data ?? { cursorId: 0, totalCount: 0, reservations: [] };
};
