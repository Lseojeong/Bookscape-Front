'use client';
import ActivityListWithPagination from '@/features/activity/common/ui/ActivityListWithPagination';
import ActivityCardSkeleton from '@/features/activity/common/ui/skeleton/ActivityCardSkeleton';
import CategoryFilter from '@/features/activity/main/ui/category-filter/CategoryFilter';
import { useSearchResult } from '@/features/activity/search/hooks/useSearchResult';
import EmptyState from '@/shared/ui/empty-state/EmptyState';
import Title from '@/shared/ui/title/Title';
import { cn } from '@/shared/utils/cn';

/**
 * 검색 결과 섹션 컴포넌트입니다.
 * 키워드 및 카테고리 필터 기반으로 체험 목록을 조회하고,
 * 브레이크포인트에 따라 페이지당 노출 개수가 달라지는 페이지네이션을 제공합니다.
 *
 * @example
 * ```tsx
 * <SearchResultSection />
 * ```
 */
export default function SearchResultSection() {
  const {
    keyword,
    page,
    category,
    handleChangeCategory,
    activities,
    totalPages,
    totalResultCount,
    handlePageChange,
    isLoading,
    isError,
    refetch,
  } = useSearchResult();

  return (
    <>
      <div className="mb-5 md:mb-7 lg:mb-10">
        <Title as="h2" size="18" weight="medium" className="text-gray-950 md:typo-24-medium">
          <span className="typo-18-bold md:typo-24-bold">{keyword}</span>으로 검색한 결과입니다.
        </Title>
        <p className="typo-14-medium text-gray-700 md:typo-18-medium">
          총 <span>{totalResultCount}</span>개의 결과
        </p>
      </div>
      <CategoryFilter selectedCategory={category} onChangeCategory={handleChangeCategory} />

      {isLoading ? (
        <>
          {/* 기본 : 6개 노출, md: 4개 노출, lg: 8개 노출 */}
          <div className="mt-10 grid grid-cols-2 gap-4.5 md:gap-5 lg:grid-cols-4 lg:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ActivityCardSkeleton
                key={i}
                className={cn(
                  i >= 4 && i < 6 ? 'md:hidden lg:block' : '',
                  i >= 6 ? 'hidden lg:block' : ''
                )}
              />
            ))}
          </div>
        </>
      ) : isError ? (
        <div className="mt-10">
          <EmptyState
            type="error"
            mainText={'문제가 발생했어요.\n잠시 후 다시 시도해주세요.'}
            onRetry={refetch}
          />
        </div>
      ) : activities.length === 0 ? (
        <EmptyState type="search" mainText={'검색 결과가 없습니다.\n다른 키워드로 검색해주세요!'} />
      ) : (
        <div className="mt-6 flex flex-col items-center gap-6 md:gap-7.5">
          <ActivityListWithPagination
            activities={activities}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}
