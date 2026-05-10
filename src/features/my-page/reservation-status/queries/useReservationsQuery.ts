import { useQuery } from '@tanstack/react-query';
import { getMyActivityReservations } from '@/features/my-page/apis';
import type { SellerReservationStatus } from '@/features/my-page/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

/**
 * 내 체험 예약 목록 조회 훅
 *
 * @description
 * 선택된 스케줄 ID와 상태(status)로 예약 목록을 조회합니다.
 * 탭 클릭 시에만 요청하며, scheduleId가 없으면 쿼리를 실행하지 않습니다.
 *
 * @param activityId - 선택된 체험 ID
 * @param scheduleId - 선택된 스케줄 ID
 * @param status - 조회할 예약 상태 (pending | confirmed | declined)
 * @returns 예약 목록 및 로딩 상태
 */
export const useReservationsQuery = (
  activityId: number | null,
  scheduleId: number | null,
  status: SellerReservationStatus
) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEYS.RESERVATIONS(activityId, scheduleId ?? 0, status),
    queryFn: () =>
      getMyActivityReservations(activityId!, { scheduleId: scheduleId!, status, size: 100 }),
    enabled: !!activityId && !!scheduleId,
    select: (data) => data.reservations,
  });

  return { reservations: data ?? [], isLoading, isError, refetch };
};
