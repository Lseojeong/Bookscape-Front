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

  /** 로그인한 사용자 정보 조회 */
  USER_ME: () => ['users', 'me'] as const,

  /** 검색 데이터 조회 */
  SEARCH_ACTIVITY: (params: GetSearchActivityParams) => ['activities', 'search', params] as const,

  /** 내 예약 내역 조회 */
  MY_RESERVATIONS: (status?: string, size?: number) =>
    ['my-reservations', status ?? 'all', size ?? 'default'] as const,

  /** 내 알림 조회 - prefix */
  MY_NOTIFICATIONS_BASE: () => ['my-notifications'] as const,

  /** 내 알림 조회 */
  MY_NOTIFICATIONS: (size?: number) =>
    [...QUERY_KEYS.MY_NOTIFICATIONS_BASE(), size ?? 'default'] as const,

  /** 내 체험 관리 목록 조회 */
  MY_ACTIVITIES: (cursorId?: number, size?: number) =>
    ['my-activities', cursorId ?? null, size ?? 10] as const,
} as const;
