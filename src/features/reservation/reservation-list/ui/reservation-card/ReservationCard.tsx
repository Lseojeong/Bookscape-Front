'use client';
import { useRouter } from 'next/navigation';
import type { MyReservation } from '@/features/reservation/types';
import BaseCardImage from '@/shared/ui/card/base/BaseCardImage';
import { cardImageStyles, cardWrapStyles } from '@/shared/ui/card/cardStyles';
import { cn } from '@/shared/utils/cn';
import ReservationCardInfo from './ReservationCardInfo';

export type ReservationCardProps = {
  data: MyReservation;
};

/**
 * 예약 정보를 표시하는 카드 컴포넌트입니다.
 *
 * - 오른쪽에 이미지가 배경처럼 겹치는 구조
 * - 정보 영역은 항상 이미지 위에 표시되어야 함
 *
 * @example
 * ```tsx
 * <ReservationCard data={data} />
 * ```
 */
export default function ReservationCard({ data }: ReservationCardProps) {
  const router = useRouter();

  const handleClickCard = () => {
    router.push(`/activity/${data.activity.id}`);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClickCard}
      className={cn('flex cursor-pointer items-center rounded-3xl', cardWrapStyles)}
    >
      {/* 이미지 */}
      <BaseCardImage
        containerClassName={cardImageStyles}
        bannerImageUrl={data.activity.bannerImageUrl}
        alt={data.activity.title}
      />
      {/* 정보 영역 */}
      <div className="relative layer-base w-full">
        <ReservationCardInfo data={data} />
      </div>
    </div>
  );
}
