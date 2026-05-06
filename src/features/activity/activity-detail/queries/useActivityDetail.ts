import { useQuery } from '@tanstack/react-query';
import { getActivityDetail } from '@/features/activity/apis';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

export const useActivityDetail = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.ACTIVITY_DETAIL(id),
    queryFn: () => getActivityDetail(id),
  });
};
