import Pagination from '@/shared/ui/pagination/Pagination';
import Title from '@/shared/ui/title/Title';
import ReviewList from './ReviewList';
import ReviewSummary from './ReviewSummary';

type Review = {
  id: number;
  nickname: string;
  rating: number;
  content: string;
  createdAt: string;
};

type ActivityReviewsProps = {
  averageRating: number;
  totalCount: number;
  currentPage: number;
  reviews: Review[];
  onPageChange: (page: number) => void;
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
 *   averageRating={4.2}
 *   totalCount={1300}
 *   currentPage={1}
 *   reviews={reviews}
 *   onPageChange={handlePageChange}
 * />
 * ```
 */
export default function ActivityReviews({
  averageRating,
  totalCount,
  currentPage,
  reviews,
  onPageChange,
}: ActivityReviewsProps) {
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="mt-5 md:mt-7.5">
      <Title as="h2" size="16" weight="bold" color="text-gray-950" className="mb-2 md:typo-18-bold">
        체험 후기
      </Title>
      <div className="mb-6">
        <ReviewSummary averageRating={averageRating} totalCount={totalCount} />
      </div>
      <ReviewList reviews={reviews} />
      <div className="mt-10 flex justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </div>
    </div>
  );
}
