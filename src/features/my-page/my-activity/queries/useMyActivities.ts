import type { InfiniteData, QueryKey } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyActivities } from '@/features/my-page/my-activity/apis';
import type { GetMyActivitiesQuery } from '@/features/my-page/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { useUserStore } from '@/shared/stores/userStore';

export const MY_ACTIVITIES_PAGE_SIZE = 10;
export const MY_ACTIVITIES_STALE_TIME = 60_000;
export const MY_ACTIVITIES_GC_TIME = 5 * 60_000;

export const useMyActivities = (query: GetMyActivitiesQuery = {}) => {
  const { size = MY_ACTIVITIES_PAGE_SIZE } = query;
  const userId = useUserStore((s) => s.user?.id);

  const infiniteQuery = useInfiniteQuery<
    Awaited<ReturnType<typeof getMyActivities>>,
    unknown,
    InfiniteData<Awaited<ReturnType<typeof getMyActivities>>, number | undefined>,
    QueryKey,
    number | undefined
  >({
    queryKey: QUERY_KEYS.MY_ACTIVITIES(size),
    enabled: !!userId,
    initialPageParam: undefined,
    queryFn: async ({ pageParam }) =>
      await getMyActivities({
        cursorId: pageParam,
        size,
      }),
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
    networkMode: 'always',
    staleTime: MY_ACTIVITIES_STALE_TIME,
    gcTime: MY_ACTIVITIES_GC_TIME,
    retry: 1,
  });

  return { query: infiniteQuery };
};
