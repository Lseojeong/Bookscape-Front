import ReviewCard from './ReviewCard';

type Review = {
  id: number;
  nickname: string;
  rating: number;
  content: string;
  createdAt: string;
};

type ReviewListProps = {
  reviews: Review[];
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
          nickname={review.nickname}
          rating={review.rating}
          content={review.content}
          createdAt={review.createdAt}
        />
      ))}
    </div>
  );
}
