import PerPersonPrice from '@/shared/ui/price/PerPersonPrice';
import RatingSummary from '@/shared/ui/rating-summary/RatingSummary';
import Title from '@/shared/ui/title/Title';
import { cn } from '@/shared/utils/cn';

type ActivityCardInfoProps = {
  title: string;
  rating: number;
  reviewCount: number;
  price: number;
  containerClassName?: string;
};

/**
 * 체험/예약 카드의 정보 영역 컴포넌트입니다.
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
  containerClassName,
}: ActivityCardInfoProps) {
  return (
    <div
      className={cn(
        'absolute bottom-0 flex w-full flex-col rounded-[18px] bg-white',
        containerClassName
      )}
    >
      <div className="flex flex-col gap-1">
        <Title as="h3" size="14" weight="bold" className="truncate">
          {title}
        </Title>
        <RatingSummary averageRating={rating} totalCount={reviewCount} />
      </div>
      <PerPersonPrice pricePerPerson={price} />
    </div>
  );
}
