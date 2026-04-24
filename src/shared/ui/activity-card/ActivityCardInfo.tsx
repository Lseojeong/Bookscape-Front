import PerPersonPrice from '@/shared/ui/price/PerPersonPrice';
import RatingSummary from '@/shared/ui/rating-summary/RatingSummary';

type ActivityCardInfoProps = {
  title: string;
  rating: number;
  reviewCount: number;
  price: number;
};

/**
 * 체험 카드의 정보 영역 컴포넌트입니다.
 * 체험 제목, 별점 요약, 1인당 가격을 표시합니다.
 *
 * @example
 * ```tsx
 * <ActivityCardInfo
 *   title="함께 배우면 즐거운 스트릿댄스"
 *   rating={4.74}
 *   reviewCount={5}
 *   price={10000}
 * />
 * ```
 */
export default function ActivityCardInfo({
  title,
  reviewCount,
  rating,
  price,
}: ActivityCardInfoProps) {
  return (
    <div className="absolute bottom-0 flex w-full flex-col gap-2.5 rounded-[18px] bg-white p-4 sm:gap-4.5">
      <div className="flex flex-col gap-1">
        <p className="typo-14-semibold truncate">{title}</p>
        <RatingSummary averageRating={rating} totalCount={reviewCount} />
      </div>
      <PerPersonPrice pricePerPerson={price} />
    </div>
  );
}
