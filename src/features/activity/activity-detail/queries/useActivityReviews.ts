import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getActivityReviews } from '@/features/activity/apis';
import type { ActivityReviewsResponse } from '@/features/activity/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

export const useActivityReviews = (
  activityId: number,
  page: number,
  initialData?: ActivityReviewsResponse
) => {
  const [initialDataUpdatedAt] = useState(() => Date.now());

  return useQuery({
    queryKey: QUERY_KEYS.ACTIVITY_REVIEWS(activityId, page),
    queryFn: () => getActivityReviews({ activityId, page, size: 3 }),
    initialData: page === 1 ? initialData : undefined,
    initialDataUpdatedAt: page === 1 && initialData ? initialDataUpdatedAt : undefined,
  });
};
