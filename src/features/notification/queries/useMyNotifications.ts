import type { InfiniteData, QueryKey } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyNotifications } from '@/features/notification/apis';
import type { GetMyNotificationsParsedResponse } from '@/features/notification/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { useUserStore } from '@/shared/stores/userStore';

export const MY_NOTIFICATIONS_PAGE_SIZE = 10;

export const MY_NOTIFICATIONS_STALE_TIME_MS = 1000 * 10;
export const MY_NOTIFICATIONS_REFETCH_INTERVAL_MS = 1000 * 30;

const EMPTY_RESPONSE: GetMyNotificationsParsedResponse = {
  cursorId: null,
  notifications: [],
  totalCount: 0,
  hasNew: false,
  lastSeenAtMs: null,
};

export const useMyNotifications = ({ size = MY_NOTIFICATIONS_PAGE_SIZE } = {}) => {
  const userId = useUserStore((s) => s.user?.id);

  const query = useInfiniteQuery<
    GetMyNotificationsParsedResponse,
    unknown,
    InfiniteData<GetMyNotificationsParsedResponse, number | undefined>,
    QueryKey,
    number | undefined
  >({
    queryKey: QUERY_KEYS.MY_NOTIFICATIONS(size),
    enabled: !!userId,
    initialPageParam: undefined,
    queryFn: async ({ pageParam }) =>
      (await getMyNotifications({ cursorId: pageParam, size })) ?? EMPTY_RESPONSE,
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
    networkMode: 'always',
    staleTime: MY_NOTIFICATIONS_STALE_TIME_MS,
    refetchInterval: MY_NOTIFICATIONS_REFETCH_INTERVAL_MS,
    retry: 1,
  });

  const pages = query.data?.pages ?? [];
  const notifications = pages.flatMap((p) => p.notifications);
  const hasNew = pages[0]?.hasNew ?? false;
  const lastSeenAtMs = pages[0]?.lastSeenAtMs ?? null;
  const totalCount = pages[0]?.totalCount ?? 0;

  return { query, notifications, hasNew, lastSeenAtMs, totalCount };
};
