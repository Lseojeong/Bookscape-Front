import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyActivityReservations } from '@/features/my-page/apis';
import type { SellerReservationStatus } from '@/features/my-page/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

const RESERVATIONS_PAGE_SIZE = 3;

export const useReservationsQuery = (
  activityId: number | null,
  scheduleId: number | null,
  status: SellerReservationStatus
) => {
  const query = useInfiniteQuery({
    queryKey: QUERY_KEYS.RESERVATIONS(activityId, scheduleId ?? 0, status),
    queryFn: ({ pageParam }) =>
      getMyActivityReservations(activityId!, {
        scheduleId: scheduleId!,
        status,
        size: RESERVATIONS_PAGE_SIZE,
        cursorId: pageParam,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
    enabled: !!activityId && !!scheduleId,
    select: (data) => ({
      reservations: data.pages.flatMap((page) => page.reservations),
      pages: data.pages,
    }),
  });

  return {
    reservations: query.data?.reservations ?? [],
    isLoading: query.isLoading,
    isPending: query.isPending,
    isError: query.isError,
    refetch: query.refetch,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isFetchNextPageError: query.isFetchNextPageError,
    fetchNextPage: query.fetchNextPage,
  };
};
