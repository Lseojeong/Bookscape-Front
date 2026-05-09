import { useQueries } from '@tanstack/react-query';
import { getMyActivityReservations } from '@/features/my-page/apis';
import type { SellerReservationStatus } from '@/features/my-page/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

const STATUSES: SellerReservationStatus[] = ['pending', 'confirmed', 'declined'];

/**
 * 내 체험 예약 목록 조회 훅
 *
 * @description
 * 전체 스케줄 ID × `pending`, `confirmed`, `declined` 조합으로 병렬 조회합니다.
 * 조회된 예약은 합쳐서 반환하며, `useReservationPanel`에서 탭/스케줄 기준으로 필터링합니다.
 * `activityId` 또는 `scheduleIds`가 없으면 쿼리를 실행하지 않습니다.
 *
 * @param activityId - 선택된 체험 ID
 * @param scheduleIds - 날짜별 전체 스케줄 ID 목록
 * @returns 전체 예약 목록 및 로딩 상태
 */
export const useReservationsQuery = (activityId: number | null, scheduleIds: number[]) => {
  const results = useQueries({
    queries: STATUSES.flatMap((status) =>
      scheduleIds.map((scheduleId) => ({
        queryKey: QUERY_KEYS.RESERVATIONS(activityId, scheduleId, status),
        queryFn: () => getMyActivityReservations(activityId!, { scheduleId, status, size: 100 }),
        enabled: !!activityId && scheduleIds.length > 0,
        select: (data: Awaited<ReturnType<typeof getMyActivityReservations>>) => data.reservations,
      }))
    ),
  });

  const reservations = results.flatMap((r) => r.data ?? []);
  const isLoading = results.some((r) => r.isLoading);

  return { reservations, isLoading };
};
