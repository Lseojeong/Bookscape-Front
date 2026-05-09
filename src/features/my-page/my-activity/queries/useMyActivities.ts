'use client';

import { useQuery } from '@tanstack/react-query';
import { myActivitiesQueryOptions } from '@/features/my-page/my-activity/queries/queryOptions';
import type { GetMyActivitiesQuery } from '@/features/my-page/types';

export const useMyActivities = (query: GetMyActivitiesQuery = {}) => {
  return useQuery(myActivitiesQueryOptions(query));
};
