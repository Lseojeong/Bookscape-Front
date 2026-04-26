import { ReactNode } from 'react';
import RatingSummary from '@/shared/ui/rating-summary/RatingSummary';
import StateBadge, { ReservationStatus } from '@/shared/ui/state-badge/StateBadge';
import Title from '@/shared/ui/title/Title';
import { cn } from '@/shared/utils/cn';

type BaseCardInfoProps = {
  title: string;
  rating: number;
  reviewCount: number;
  containerClassName?: string;
  status?: ReservationStatus; // 예약 상태
  price: number;
  priceSlot?: (props: { price: number }) => ReactNode;
};

/**
 * 체험/예약 카드의 정보 영역 컴포넌트입니다.
 * 체험 제목, 별점 요약, 1인당 가격을 표시합니다.
 *
 * @example
 * ```tsx
 * <BaseCardInfo
 *   title="함께 배우면 즐거운 스트릿댄스"
 *   rating={4.74}
 *   reviewCount={5}
 *   priceSlot={<PerPersonPrice pricePerPerson={price} />}
 * />
 * ```
 */
export default function BaseCardInfo({
  title,
  reviewCount,
  rating,
  containerClassName,
  status,
  price,
  priceSlot,
}: BaseCardInfoProps) {
  return (
    <div
      className={cn(
        'absolute bottom-0 flex w-full flex-col rounded-[18px] bg-white',
        containerClassName
      )}
    >
      {/* 예약 상태 뱃지 */}
      {status && (
        <div>
          <StateBadge status={status} />
        </div>
      )}

      {/* 타이틀, 리뷰 요약 */}
      <div className="flex flex-col gap-1">
        <Title as="h3" size="14" weight="semibold" className="truncate">
          {title}
        </Title>
        <RatingSummary averageRating={rating} totalCount={reviewCount} />
      </div>

      {/* 가격 */}
      {priceSlot?.({ price })}
    </div>
  );
}
