import { useQuery } from '@tanstack/react-query';
import { getHotActivityData } from '@/features/activity/apis';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

const HOT_ACTIVITY_STALE_TIME = 5 * 60 * 1000; // 5분
const HOT_ACTIVITY_GC_TIME = 10 * 60 * 1000; // 10분

export const useHotActivityData = (size: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.HOT_ACTIVITY(size),
    queryFn: () => getHotActivityData(size),
    staleTime: HOT_ACTIVITY_STALE_TIME,
    gcTime: HOT_ACTIVITY_GC_TIME,
  });
};
