import { useQuery } from '@tanstack/react-query';
import { getReservedSchedule } from '@/features/my-page/apis';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

/**
 * 내 체험 날짜별 예약 스케줄 조회 훅
 *
 * @description
 * 날짜 클릭 시 해당 날짜의 스케줄 목록을 조회합니다.
 * `activityId` 또는 `date`가 없으면 쿼리를 실행하지 않습니다.
 *
 * @param activityId - 선택된 체험 ID
 * @param date - 선택된 날짜 (`YYYY-MM-DD`)
 */
export const useReservedScheduleQuery = (activityId: number | null, date: string | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.RESERVED_SCHEDULE(activityId, date),
    queryFn: () => getReservedSchedule(activityId!, date!),
    enabled: !!activityId && !!date,
  });
};
