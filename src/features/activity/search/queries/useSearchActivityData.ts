import { useQuery } from '@tanstack/react-query';
import { getSearchActivityData } from '@/features/activity/apis';
import { GetSearchActivityParams } from '@/features/activity/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

/**
 * 검색 조건에 따라 체험 목록을 조회하는 쿼리 훅입니다.
 *
 * @param params - 검색 조건 (method, keyword, category, page, size)
 *
 * @example
 * ```tsx
 * const { data } = useSearchActivityData({
 *   keyword: '서울',
 *   category: '투어',
 *   page: 1,
 *   size: 8,
 * });
 * ```
 */
export const useSearchActivityData = (params: GetSearchActivityParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.SEARCH_ACTIVITY(params),
    queryFn: () => getSearchActivityData(params),
  });
};
