import ReviewCard from '@/features/activity/activity-detail/ui/review/ReviewCard';
import type { ActivityReview } from '@/features/activity/types';

type ReviewListProps = {
  reviews: ActivityReview[];
};

/**
 * 체험 리뷰 목록 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <ReviewList reviews={reviews} />
 * ```
 */
export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="flex flex-col gap-5">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          nickname={review.user.nickname}
          rating={review.rating}
          content={review.content}
          createdAt={review.createdAt}
        />
      ))}
    </div>
  );
}
