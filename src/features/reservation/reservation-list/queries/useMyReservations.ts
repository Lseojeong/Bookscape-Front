import { useQuery } from '@tanstack/react-query';
import { getMyReservations } from '@/features/reservation/apis';
import type { GetMyReservationsResponse, MyReservationStatus } from '@/features/reservation/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

type UseMyReservationsParams = {
  status?: MyReservationStatus;
  size?: number;
};

const EMPTY_RESPONSE: GetMyReservationsResponse = {
  cursorId: null,
  reservations: [],
  totalCount: 0,
};

export const useMyReservations = ({ status, size = 10 }: UseMyReservationsParams = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.MY_RESERVATIONS(status, size),
    queryFn: async () =>
      (await getMyReservations({
        size,
        status,
      })) ?? EMPTY_RESPONSE,
    // TODO: 무한 스크롤 적용 시 useInfiniteQuery + getNextPageParam로 교체
  });
};
