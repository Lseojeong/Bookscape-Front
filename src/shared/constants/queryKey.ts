/**
 * React Query에서 사용하는 query key를 모아 관리합니다.
 * query key는 문자열을 직접 작성하지 않고 이 상수를 통해 참조합니다.
 */
export const QUERY_KEYS = {
  ACTIVITY_DETAIL: (id: number) => ['activity', id] as const,
  HOT_ACTIVITY: (size: number) => ['activities', 'hot', size] as const,
  MY_ACTIVITIES: () => ['my-activities'] as const,
} as const;
