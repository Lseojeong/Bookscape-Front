import { QueryClient } from '@tanstack/react-query';
import { getActivityDetail } from '@/features/activity/apis';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

export const prefetchActivityDetail = async (queryClient: QueryClient, id: number) => {
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.ACTIVITY_DETAIL(id),
    queryFn: () => getActivityDetail(id),
  });
};
