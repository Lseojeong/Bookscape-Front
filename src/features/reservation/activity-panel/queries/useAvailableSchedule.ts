import { useQuery } from '@tanstack/react-query';
import { getAvailableSchedule } from '@/features/activity/apis';
import type { ActivitySchedule } from '@/features/activity/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

const INITIAL_DATA_UPDATED_AT = Date.now();

type Options = {
  initialData?: ActivitySchedule[];
  initialYear?: string;
  initialMonth?: string;
};

export const useAvailableSchedule = (
  activityId: number,
  year: string,
  month: string,
  { initialData, initialYear, initialMonth }: Options = {}
) => {
  const isInitialMonth = year === initialYear && month === initialMonth;

  return useQuery({
    queryKey: QUERY_KEYS.AVAILABLE_SCHEDULE(activityId, year, month),
    queryFn: () => getAvailableSchedule(activityId, year, month),
    initialData: isInitialMonth ? initialData : undefined,
    initialDataUpdatedAt: isInitialMonth && initialData ? INITIAL_DATA_UPDATED_AT : undefined,
  });
};
