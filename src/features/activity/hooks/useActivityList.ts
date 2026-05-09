import { useRouter, useSearchParams } from 'next/navigation';
import { startTransition, useCallback, useEffect } from 'react';
import {
  usePrefetchNextPage,
  useSearchActivityData,
} from '@/features/activity/search/queries/useSearchActivityData';
import { usePageSize } from '@/shared/hooks/usePageSize';

type UseActivityListParams = {
  keyword?: string;
  category?: string;
  sort?: string;
  pageSize: { mobile: number; tablet: number; desktop: number };
  basePath: string; // '/search' | '/activities'
};

export const useActivityList = ({
  keyword,
  category,
  sort,
  pageSize: pageSizeConfig,
  basePath,
}: UseActivityListParams) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);

  // 한 페이지에 노출 시킬 카드 개수
  const pageSize = usePageSize(pageSizeConfig) ?? undefined;

  // URL 파라미터를 업데이트하는 공통 함수
  const updateParams = useCallback(
    (updates: Record<string, string>, mode: 'push' | 'replace' = 'push') => {
      const params = new URLSearchParams(window.location.search);
      Object.entries(updates).forEach(([key, value]) => params.set(key, value));

      if (mode === 'replace') {
        router.replace(`${basePath}?` + params.toString());
      } else {
        router.push(`${basePath}?` + params.toString());
      }
    },
    [router, basePath]
  );

  // pageSize 변경 시 페이지 초기화
  useEffect(() => {
    if (!pageSize) return;
    startTransition(() => {
      updateParams({ page: '1' }, 'replace');
    });
  }, [pageSize, updateParams]);

  const { data } = useSearchActivityData({
    keyword,
    category: category === '전체' ? '' : category,
    sort,
    page,
    size: pageSize,
  });

  const activities = data?.activities ?? [];
  const totalCount = data?.totalCount ?? 0;

  // totalCount를 pageSize로 나눠 총 페이지 수 계산
  const totalPages = pageSize ? Math.ceil(totalCount / pageSize) : 0;

  // TODO 확인!!!!!!!!!!!!
  // 다음 페이지 prefetch (마지막 페이지면 실행 안 함)
  usePrefetchNextPage({
    keyword,
    category: category === '전체' ? '' : category,
    sort,
    page,
    size: pageSize,
    totalPages,
  });

  return {
    page,
    pageSize,
    activities,
    totalCount,
    totalPages,
    updateParams,
    handlePageChange: (newPage: number) => updateParams({ page: String(newPage) }),
  };
};
