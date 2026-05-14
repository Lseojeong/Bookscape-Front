import { useQuery } from '@tanstack/react-query';
import { getActivityDetail } from '@/features/activity/apis';
import type { ActivityDetail } from '@/features/activity/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

const INITIAL_DATA_UPDATED_AT = Date.now();

export const useActivityDetail = (id: number, initialData?: ActivityDetail) => {
  return useQuery({
    queryKey: QUERY_KEYS.ACTIVITY_DETAIL(id),
    queryFn: () => getActivityDetail(id),
    initialData,
    initialDataUpdatedAt: initialData ? INITIAL_DATA_UPDATED_AT : undefined,
  });
};
