import { useQuery } from '@tanstack/react-query';
import { getAvailableSchedule } from '@/features/activity/apis';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

export const useAvailableSchedule = (activityId: number, year: string, month: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.AVAILABLE_SCHEDULE(activityId, year, month),
    queryFn: () => getAvailableSchedule(activityId, year, month),
  });
};
