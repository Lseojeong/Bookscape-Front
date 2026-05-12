import { StarIcon } from '@/shared/assets/icons';

const getRatingLabel = (rating: number, totalCount: number) => {
  if (totalCount === 0) return '후기 없음';
  if (rating >= 4.5) return '매우 만족'; // 4.5 ~ 5.0
  if (rating >= 4.0) return '만족'; // 4.0 ~ 4.4
  if (rating >= 3.0) return '보통'; // 3.0 ~ 3.9
  if (rating >= 2.0) return '불만족'; // 2.0 ~ 2.9
  return '매우 불만족'; // 0 ~ 1.9
};

type ReviewSummaryProps = {
  averageRating: number;
  totalCount: number;
};

/**
 * 체험 리뷰 요약 컴포넌트입니다.
 *
 * 평균 별점, 만족도 텍스트, 총 리뷰 수를 표시합니다.
 *
 * @example
 * ```tsx
 * <ReviewSummary averageRating={4.2} totalCount={1300} />
 * ```
 */
export default function ReviewSummary({ averageRating, totalCount }: ReviewSummaryProps) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <p className="typo-24-bold text-gray-950 md:typo-32-bold">{averageRating.toFixed(1)}</p>
      <p className="typo-14-bold text-gray-950 md:typo-16-bold">
        {getRatingLabel(averageRating, totalCount)}
      </p>
      <div className="flex items-center gap-0.5">
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <p className="typo-14-medium text-gray-500">{totalCount.toLocaleString()}개 후기</p>
      </div>
    </div>
  );
}
