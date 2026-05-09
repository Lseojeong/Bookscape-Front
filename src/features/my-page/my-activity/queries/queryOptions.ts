import { getMyActivities } from '@/features/my-page/my-activity/apis';
import type { GetMyActivitiesQuery } from '@/features/my-page/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

export const MY_ACTIVITIES_STALE_TIME = 60_000;
export const MY_ACTIVITIES_GC_TIME = 5 * 60_000;

export const myActivitiesQueryOptions = (query: GetMyActivitiesQuery = {}) => {
  const { cursorId, size } = query;
  return {
    queryKey: QUERY_KEYS.MY_ACTIVITIES(cursorId, size),
    queryFn: () => getMyActivities({ cursorId, size }),
    staleTime: MY_ACTIVITIES_STALE_TIME,
    gcTime: MY_ACTIVITIES_GC_TIME,
  } as const;
};
