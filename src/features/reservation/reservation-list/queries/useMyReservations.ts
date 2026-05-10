import type { InfiniteData, QueryKey } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyReservations } from '@/features/reservation/apis';
import type { GetMyReservationsResponse, MyReservationStatus } from '@/features/reservation/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { useUserStore } from '@/shared/stores/userStore';

type UseMyReservationsParams = {
  status?: MyReservationStatus;
  size?: number;
};

export const MY_RESERVATIONS_PAGE_SIZE = 5;

const MY_RESERVATIONS_STALE_TIME_MS = 5 * 60 * 1000;

const EMPTY_RESPONSE: GetMyReservationsResponse = {
  cursorId: null,
  reservations: [],
  totalCount: 0,
};

export const useMyReservations = ({
  status,
  size = MY_RESERVATIONS_PAGE_SIZE,
}: UseMyReservationsParams = {}) => {
  const userId = useUserStore((s) => s.user?.id);

  const query = useInfiniteQuery<
    GetMyReservationsResponse,
    unknown,
    InfiniteData<GetMyReservationsResponse, number | undefined>,
    QueryKey,
    number | undefined
  >({
    queryKey: QUERY_KEYS.MY_RESERVATIONS(status, size),
    enabled: !!userId,
    initialPageParam: undefined,
    queryFn: async ({ pageParam }) =>
      (await getMyReservations({
        cursorId: pageParam,
        size,
        status,
      })) ?? EMPTY_RESPONSE,
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
    networkMode: 'always',
    staleTime: MY_RESERVATIONS_STALE_TIME_MS,
    retry: 1,
  });

  return { query };
};
