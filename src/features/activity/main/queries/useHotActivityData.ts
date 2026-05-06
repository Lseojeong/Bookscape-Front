import { useQuery } from '@tanstack/react-query';
import { getHotActivityData } from '@/features/activity/apis';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

export const useHotActivityData = (size: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.HOT_ACTIVITY(size),
    queryFn: () => getHotActivityData(size),
  });
};
