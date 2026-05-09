import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getSearchActivityData } from '@/features/activity/apis';
import { ActivityResponse, GetSearchActivityParams } from '@/features/activity/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

const SEARCH_STALE_TIME = 60 * 1000 * 5; // 5분

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
export const useSearchActivityData = (
  params: GetSearchActivityParams,
  options?: Omit<UseQueryOptions<ActivityResponse | null>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: QUERY_KEYS.SEARCH_ACTIVITY(params),
    queryFn: () => getSearchActivityData(params),
    staleTime: SEARCH_STALE_TIME,
    gcTime: 60 * 1000 * 10,
    ...options,
  });
};

export const usePrefetchNextPage = (params: GetSearchActivityParams & { totalPages?: number }) => {
  const queryClient = useQueryClient();
  const { keyword, category, page, size, totalPages } = params;

  useEffect(() => {
    // totalPages가 0이거나 없으면 prefetch 안 함
    if (!totalPages || (page ?? 1) >= totalPages) return;

    const nextPageParams = {
      keyword,
      category,
      page: (page ?? 1) + 1,
      size,
    };

    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.SEARCH_ACTIVITY(nextPageParams),
      queryFn: () => getSearchActivityData(nextPageParams),
      staleTime: SEARCH_STALE_TIME,
    });
  }, [keyword, category, page, size, totalPages, queryClient]);
};
