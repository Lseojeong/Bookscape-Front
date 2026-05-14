import { useQuery } from '@tanstack/react-query';
import { getActivityReviews } from '@/features/activity/apis';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import type { ActivityReviewsResponse } from '../../types';

const INITIAL_DATA_UPDATED_AT = Date.now();

export const useActivityReviews = (
  activityId: number,
  page: number,
  initialData?: ActivityReviewsResponse
) => {
  return useQuery({
    queryKey: QUERY_KEYS.ACTIVITY_REVIEWS(activityId, page),
    queryFn: () => getActivityReviews({ activityId, page }),
    initialData: page === 1 ? initialData : undefined,
    initialDataUpdatedAt: page === 1 && initialData ? INITIAL_DATA_UPDATED_AT : undefined,
  });
};
