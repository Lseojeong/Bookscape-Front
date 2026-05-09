import { GetSearchActivityParams } from '@/features/activity/types';

/**
 * React Query에서 사용하는 query key를 모아 관리합니다.
 * query key는 문자열을 직접 작성하지 않고 이 상수를 통해 참조합니다.
 */
export const QUERY_KEYS = {
  /** 체험 상세 조회 */
  ACTIVITY_DETAIL: (id: number) => ['activity', id] as const,
  /** 메인 - 인기 체험 조회 */
  HOT_ACTIVITY: (size: number) => ['activities', 'hot', size] as const,
  /** 검색 데이터 조회 */
  SEARCH_ACTIVITY: (params: GetSearchActivityParams) => ['activities', 'search', params] as const,
  /** 내 예약 내역 조회 */
  MY_RESERVATIONS: (status?: string, size?: number) =>
    ['my-reservations', status ?? 'all', size ?? 'default'] as const,
  /** 내 체험 목록 조회 */
  MY_ACTIVITIES: (cursorId?: number, size?: number) =>
    ['my-activities', cursorId ?? null, size ?? 10] as const,
  /** 내 체험 월별 예약 현황 조회 */
  RESERVATION_DASHBOARD: (activityId: number | null, year: string, month: string) =>
    ['my-activities', activityId, 'reservation-dashboard', year, month] as const,
  /** 내 체험 날짜별 예약 스케줄 조회 */
  RESERVED_SCHEDULE: (activityId: number | null, date: string | null) =>
    ['my-activities', activityId, 'reserved-schedule', date] as const,
  /** 내 체험 예약 목록 조회 */
  RESERVATIONS: (activityId: number | null, scheduleId: number, status: string) =>
    ['my-activities', activityId, 'reservations', scheduleId, status] as const,
} as const;
