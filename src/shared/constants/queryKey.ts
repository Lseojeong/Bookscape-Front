import { GetActivityParams } from '@/features/activity/types';

/**
 * React Query에서 사용하는 query key를 모아 관리합니다.
 * query key는 문자열을 직접 작성하지 않고 이 상수를 통해 참조합니다.
 */
export const QUERY_KEYS = {
  /** 체험 상세 조회 */
  ACTIVITY_DETAIL: (id: number) => ['activity', id] as const,

  /** 메인 - 인기 체험 조회 */
  HOT_ACTIVITY: (size: number) => ['activities', 'hot', size] as const,

  /** 예약 가능일 조회 */
  AVAILABLE_SCHEDULE: (activityId: number, year: string, month: string) =>
    ['activity', activityId, 'available-schedule', year, month] as const,

  /** 검색 및 체험 목록 데이터 조회 */
  ACTIVITY_LIST: (params: GetActivityParams) => ['activities', params] as const,
  /** 로그인한 사용자 정보 조회 */
  USER_ME: () => ['users', 'me'] as const,
  /** 내 예약 내역 조회 - prefix */
  MY_RESERVATIONS_BASE: () => ['my-reservations'] as const,
  /** 내 예약 내역 조회 */
  MY_RESERVATIONS: (status?: string, size?: number) =>
    [...QUERY_KEYS.MY_RESERVATIONS_BASE(), status ?? 'all', size ?? 'default'] as const,
  /** 내 알림 조회 - prefix */
  MY_NOTIFICATIONS_BASE: () => ['my-notifications'] as const,

  /** 내 알림 조회 */
  MY_NOTIFICATIONS: (size?: number) =>
    [...QUERY_KEYS.MY_NOTIFICATIONS_BASE(), size ?? 'default'] as const,

  /** 내 체험 목록 조회 - prefix */
  MY_ACTIVITIES_BASE: () => ['my-activities'] as const,

  /** 내 체험 목록 조회(일반 리스트) */
  MY_ACTIVITIES: (size?: number) =>
    [...QUERY_KEYS.MY_ACTIVITIES_BASE(), 'list', size ?? 10] as const,

  /** 내 체험 목록 조회(무한 스크롤) - prefix */
  MY_ACTIVITIES_INFINITE_BASE: () => [...QUERY_KEYS.MY_ACTIVITIES_BASE(), 'infinite'] as const,

  /** 내 체험 목록 조회(무한 스크롤) */
  MY_ACTIVITIES_INFINITE: (size?: number) =>
    [...QUERY_KEYS.MY_ACTIVITIES_INFINITE_BASE(), size ?? 10] as const,

  /** 체험 후기 조회 */
  ACTIVITY_REVIEWS: (activityId: number, page: number) =>
    ['activity', activityId, 'reviews', page] as const,
  /** 내 체험 월별 예약 현황 조회 */
  RESERVATION_DASHBOARD: (activityId: number | null, year: string, month: string) =>
    [...QUERY_KEYS.MY_ACTIVITIES_BASE(), activityId, 'reservation-dashboard', year, month] as const,
  /** 내 체험 날짜별 예약 스케줄 조회 */
  RESERVED_SCHEDULE: (activityId: number | null, date: string | null) =>
    [...QUERY_KEYS.MY_ACTIVITIES_BASE(), activityId, 'reserved-schedule', date] as const,
  /** 내 체험 예약 목록 조회 */
  RESERVATIONS: (activityId: number | null, scheduleId: number, status: string) =>
    [...QUERY_KEYS.MY_ACTIVITIES_BASE(), activityId, 'reservations', scheduleId, status] as const,
} as const;
