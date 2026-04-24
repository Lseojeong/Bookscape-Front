import { StarIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

/**
 * 별점 평균과 리뷰 수를 함께 표시하는 컴포넌트입니다.
 *
 * @example
 * // 기본
 * <RatingSummary averageRating={4.5} totalCount={128} />
 *
 * // 텍스트 스타일 변경
 * <RatingSummary
 *   averageRating={4.5}
 *   totalCount={128}
 *   ratingClassName="text-gray-950"
 *   countClassName="text-gray-400"
 *  />
 */
export type RatingSummaryProps = {
  averageRating: number;
  totalCount: number;
  /** 평균 별점 텍스트에 적용할 스타일 */
  ratingClassName?: string;
  /** 리뷰 수 텍스트에 적용할 스타일 */
  countClassName?: string;
};

export default function RatingSummary({
  averageRating,
  totalCount,
  ratingClassName,
  countClassName,
}: RatingSummaryProps) {
  const safeRating = Math.min(5, Math.max(0, averageRating));
  const ratingText = safeRating.toFixed(1);

  return (
    <div
      className="flex items-center gap-1"
      aria-label={`별점 ${ratingText}점, 리뷰 ${totalCount}개`}
    >
      <StarIcon className="h-5 w-5 -translate-y-px" aria-hidden="true" />
      <div className="flex items-center gap-0.5 leading-none">
        <span className={cn('typo-14-medium text-gray-700', ratingClassName)}>{ratingText}</span>
        <span className={cn('typo-14-medium text-gray-700', countClassName)}>
          ({totalCount.toLocaleString()})
        </span>
      </div>
    </div>
  );
}
