import { useQuery } from '@tanstack/react-query';
import { getHotActivityData } from '@/features/activity/apis';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

const HOT_ACTIVITY_STALE_TIME = 10 * 60 * 1000; // 10분
const HOT_ACTIVITY_GC_TIME = 30 * 60 * 1000; // 30분

/**
 * 메인 페이지의 인기 체험 목록 데이터를 조회하는 커스텀 훅입니다.
 * React Query를 사용하여 캐싱을 처리하며, 지정된 size만큼의 데이터를 가져옵니다.
 *
 * @param size - 조회할 체험 목록의 개수
 * @example
 * ```tsx
 * const { data: activityData = [] } = useHotActivityData(10);
 * ```
 */
export const useHotActivityData = (size: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.HOT_ACTIVITY(size),
    queryFn: () => getHotActivityData(size),
    staleTime: HOT_ACTIVITY_STALE_TIME,
    gcTime: HOT_ACTIVITY_GC_TIME,
  });
};
