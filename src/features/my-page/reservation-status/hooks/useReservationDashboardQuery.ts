import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { getReservationDashboard } from '@/features/my-page/apis';

/**
 * 내 체험 월별 예약 현황 조회 훅
 *
 * @description
 * 선택된 체험 ID와 현재 월을 기준으로 달력 예약 현황을 조회합니다.
 * `activityId`가 없으면 쿼리를 실행하지 않습니다.
 *
 * @param activityId - 선택된 체험 ID (`null`이면 쿼리 비활성화)
 * @param month - 현재 달력 월 (`Date` 객체)
 */
export const useReservationDashboardQuery = (activityId: number | null, month: Date) => {
  const year = format(month, 'yyyy');
  const monthStr = format(month, 'MM');

  return useQuery({
    queryKey: ['my-activities', activityId, 'reservation-dashboard', year, monthStr],
    queryFn: () => getReservationDashboard(activityId!, { year, month: monthStr }),
    enabled: !!activityId,
  });
};
