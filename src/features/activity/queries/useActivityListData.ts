import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getActivityListData } from '@/features/activity/apis';
import { ActivityResponse, GetActivityParams } from '@/features/activity/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

const ACTIVITY_STALE_TIME = 60 * 1000 * 5; // 5분
const ACTIVITY_GC_TIME = 60 * 1000 * 10; // 10분

/**
 * 체험 목록을 조회하는 쿼리 훅입니다.
 * 검색 페이지와 체험 목록 페이지에서 공통으로 사용됩니다.
 *
 * @param params - 조회 조건 (키워드, 카테고리, 정렬, 페이지, 사이즈)
 * @param options - useQuery 추가 옵션 (queryKey, queryFn 제외)
 */
export const useActivityListData = (
  params: GetActivityParams,
  options?: Omit<UseQueryOptions<ActivityResponse | null>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: QUERY_KEYS.ACTIVITY_LIST(params),
    queryFn: () => getActivityListData(params),
    staleTime: ACTIVITY_STALE_TIME,
    gcTime: ACTIVITY_GC_TIME,
    ...options,
  });
};

/**
 * 다음 페이지 데이터를 미리 prefetch하는 훅입니다.
 * 현재 페이지가 마지막 페이지이거나 totalPages가 없으면 실행하지 않습니다.
 *
 * @param params - 조회 조건 + totalPages (현재 페이지가 마지막인지 판단에 사용)
 */
export const usePrefetchNextPage = (params: GetActivityParams & { totalPages?: number }) => {
  const queryClient = useQueryClient();
  const { keyword, category, sort, page, size, totalPages } = params;

  useEffect(() => {
    // totalPages가 0이거나 없으면 prefetch 안 함
    if (!totalPages || (page ?? 1) >= totalPages) return;

    const nextPageParams = {
      keyword,
      category,
      sort,
      page: (page ?? 1) + 1,
      size,
    };

    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.ACTIVITY_LIST(nextPageParams),
      queryFn: () => getActivityListData(nextPageParams),
      staleTime: ACTIVITY_STALE_TIME,
    });
  }, [keyword, category, sort, page, size, totalPages, queryClient]);
};
