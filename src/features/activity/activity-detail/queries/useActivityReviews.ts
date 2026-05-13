import { useQuery } from '@tanstack/react-query';
import { getActivityReviews } from '@/features/activity/apis';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

export const useActivityReviews = (activityId: number, page: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.ACTIVITY_REVIEWS(activityId, page),
    queryFn: () => getActivityReviews({ activityId, page }),
  });
};
