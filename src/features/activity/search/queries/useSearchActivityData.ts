import { useQuery } from '@tanstack/react-query';
import { getSearchActivityData } from '@/features/activity/apis';
import { GetSearchActivityParams } from '@/features/activity/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

export const useSearchActivityData = (params: GetSearchActivityParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.SEARCH_ACTIVITY(params),
    queryFn: () => getSearchActivityData(params),
  });
};
