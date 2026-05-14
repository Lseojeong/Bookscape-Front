import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getActivityDetail } from '@/features/activity/apis';
import type { ActivityDetail } from '@/features/activity/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

export const useActivityDetail = (id: number, initialData?: ActivityDetail) => {
  const [initialDataUpdatedAt] = useState(() => Date.now());

  return useQuery({
    queryKey: QUERY_KEYS.ACTIVITY_DETAIL(id),
    queryFn: () => getActivityDetail(id),
    initialData,
    initialDataUpdatedAt: initialData ? initialDataUpdatedAt : undefined,
  });
};
