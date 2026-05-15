'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useActivityReviews } from '@/features/activity/activity-detail/queries/useActivityReviews';
import ReviewList from '@/features/activity/activity-detail/ui/review/ReviewList';
import ReviewSummary from '@/features/activity/activity-detail/ui/review/ReviewSummary';
import type { ActivityReviewsResponse } from '@/features/activity/types';
import useDelayedLoading from '@/shared/hooks/useDelayedLoading';
import EmptyState from '@/shared/ui/empty-state/EmptyState';
import Pagination from '@/shared/ui/pagination/Pagination';
import Title from '@/shared/ui/title/Title';
import ActivityReviewsSkeleton from './ReviewsSkeleton';

type ActivityReviewsProps = {
  activityId: number;
  initialData?: ActivityReviewsResponse;
};

const PAGE_SIZE = 3;

/**
 * 체험 리뷰 섹션 컴포넌트입니다.
 *
 * 리뷰 요약, 리뷰 목록, 페이지네이션을 포함합니다.
 *
 * @example
 * ```tsx
 * <ActivityReviews
 *   activityId={activityId}
 *   initialData={initialReviewsData}
 * />
 * ```
 */
export default function ActivityReviews({ activityId, initialData }: ActivityReviewsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('reviewPage') || 1);

  const { data, isFetching, isError, refetch } = useActivityReviews(
    activityId,
    currentPage,
    initialData
  );
  const isSkeletonVisible = useDelayedLoading(isFetching);

  const totalPages = Math.ceil((data?.totalCount ?? 0) / PAGE_SIZE);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('reviewPage', String(page));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const renderContent = () => {
    if (isFetching && !isSkeletonVisible) return null;
    if (isSkeletonVisible) return <ActivityReviewsSkeleton />;
    if (isError)
      return (
        <EmptyState
          type="error"
          mainText={'리뷰를 불러오지 못했습니다.\n잠시 후 다시 시도해주세요.'}
          onRetry={() => refetch()}
        />
      );
    if (data?.totalCount === 0)
      return (
        <EmptyState
          type="review"
          mainText={'작성된 후기가 없습니다.\n첫 번째 후기를 남겨보세요!'}
        />
      );

    return (
      <>
        <div className="mb-6">
          <ReviewSummary
            averageRating={data?.averageRating ?? 0}
            totalCount={data?.totalCount ?? 0}
          />
        </div>
        <ReviewList reviews={data?.reviews ?? []} />
        <div className="mt-10 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </>
    );
  };

  return (
    <div className="mt-5 md:mt-7.5">
      <Title as="h2" size="16" weight="bold" color="text-gray-950" className="mb-2 md:typo-18-bold">
        체험 후기
      </Title>
      {renderContent()}
    </div>
  );
}
