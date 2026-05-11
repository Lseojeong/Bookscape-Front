import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyActivityReservations } from '@/features/my-page/apis';
import type { SellerReservationStatus } from '@/features/my-page/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

const RESERVATIONS_PAGE_SIZE = 3;

/**
 * 내 체험 예약 목록 조회 훅
 *
 * @description
 * 선택된 스케줄 ID와 상태(status)로 예약 목록을 무한스크롤로 조회합니다.
 * `activityId` 또는 `scheduleId`가 없으면 쿼리를 실행하지 않습니다.
 * 커서 기반 페이지네이션으로 `RESERVATIONS_PAGE_SIZE`개씩 불러옵니다.
 *
 * @param activityId - 선택된 체험 ID
 * @param scheduleId - 선택된 스케줄 ID
 * @param status - 조회할 예약 상태 (pending | confirmed | declined)
 * @returns 예약 목록 및 무한스크롤 관련 상태
 * @example
 * ```tsx
 * const {
 *   reservations,
 *   isPending,
 *   isError,
 *   hasNextPage,
 *   isFetchingNextPage,
 *   isFetchNextPageError,
 *   fetchNextPage,
 * } = useReservationsQuery(activityId, scheduleId, 'pending');
 */

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
    enabled: activityId !== null && scheduleId !== null,
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
