'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useActivityReviews } from '@/features/activity/activity-detail/queries/useActivityReviews';
import ReviewList from '@/features/activity/activity-detail/ui/review/ReviewList';
import ReviewSummary from '@/features/activity/activity-detail/ui/review/ReviewSummary';
import Pagination from '@/shared/ui/pagination/Pagination';
import Title from '@/shared/ui/title/Title';

type ActivityReviewsProps = {
  activityId: number;
};

const PAGE_SIZE = 3;

/**
 * 체험 리뷰 섹션 컴포넌트입니다.
 *
 * 리뷰 요약, 리뷰 목록, 페이지네이션을 포함합니다.
 *
 * @example
 * ```tsx
 * <ActivityReviews activityId={activityId} />
 * ```
 */
export default function ActivityReviews({ activityId }: ActivityReviewsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('reviewPage') ?? 1);

  const { data } = useActivityReviews(activityId, currentPage);

  const totalPages = Math.ceil((data?.totalCount ?? 0) / PAGE_SIZE);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('reviewPage', String(page));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mt-5 md:mt-7.5">
      <Title as="h2" size="16" weight="bold" color="text-gray-950" className="mb-2 md:typo-18-bold">
        체험 후기
      </Title>
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
    </div>
  );
}
