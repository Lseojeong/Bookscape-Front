/**
 * React Query에서 사용하는 query key를 모아 관리합니다.
 * query key는 문자열을 직접 작성하지 않고 이 상수를 통해 참조합니다.
 */

// TODO : 다은님 코드랑 충돌 날 수 있어서 머지 전에 확인 필요함
export const QUERY_KEYS = {
  HOT_ACTIVITY: (size: number) => ['activities', 'hot', size] as const,
} as const;
