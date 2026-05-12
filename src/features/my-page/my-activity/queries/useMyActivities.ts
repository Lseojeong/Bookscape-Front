import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyActivities } from '@/features/my-page/my-activity/apis';
import type { GetMyActivitiesQuery } from '@/features/my-page/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { useUserStore } from '@/shared/stores/userStore';

export const MY_ACTIVITIES_PAGE_SIZE = 10;

const MY_ACTIVITIES_STALE_TIME_MS = 5 * 60 * 1000;
const MY_ACTIVITIES_GC_TIME_MS = 30 * 60 * 1000;

export const useMyActivities = ({
  size = MY_ACTIVITIES_PAGE_SIZE,
}: Pick<GetMyActivitiesQuery, 'size'> = {}) => {
  const userId = useUserStore((s) => s.user?.id);

  const infiniteQuery = useInfiniteQuery({
    queryKey: QUERY_KEYS.MY_ACTIVITIES(size),
    enabled: !!userId,
    initialPageParam: undefined as number | undefined,
    queryFn: async ({ pageParam }) =>
      await getMyActivities({
        cursorId: pageParam,
        size,
      }),
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
    networkMode: 'always',
    staleTime: MY_ACTIVITIES_STALE_TIME_MS,
    gcTime: MY_ACTIVITIES_GC_TIME_MS,
    retry: 1,
  });

  return infiniteQuery;
};
