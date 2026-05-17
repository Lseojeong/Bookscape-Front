'use client';
import { useRouter } from 'next/navigation';
import type { MyReservation } from '@/features/reservation/types';
import BaseCardImage from '@/shared/ui/card/base/BaseCardImage';
import { cardImageStyles, cardWrapStyles } from '@/shared/ui/card/cardStyles';
import { cn } from '@/shared/utils/cn';
import ReservationCardInfo from './ReservationCardInfo';

export type ReservationCardProps = {
  data: MyReservation;
  onReservationChangeClick?: (reservation: MyReservation) => void;
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
export default function ReservationCard({ data, onReservationChangeClick }: ReservationCardProps) {
  const router = useRouter();

  const handleClickCard = (e: React.MouseEvent | React.KeyboardEvent) => {
    // 내부의 버튼이나 링크 클릭 시에는 카드 전체 클릭 이벤트가 발생하지 않도록 방지
    if ((e.target as HTMLElement).closest('button, a')) return;
    // NOTE: React Portal을 통한 이벤트 버블링 방지 (DOM 트리 외부 클릭 무시)
    if (!(e.currentTarget as HTMLElement).contains(e.target as Node)) return;
    if (e.type === 'click' || (e as React.KeyboardEvent).key === 'Enter') {
      router.push(`/activity/${data.activity.id}`);
    }
  };
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClickCard}
      onKeyDown={handleClickCard}
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
        <ReservationCardInfo data={data} onReservationChangeClick={onReservationChangeClick} />
      </div>
    </div>
  );
}
