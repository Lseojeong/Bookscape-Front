import BaseCardImage from '@/shared/ui/card/base/BaseCardImage';
import { cardImageStyles, cardWrapStyles } from '@/shared/ui/card/cardStyles';
import { ReservationStatus } from '@/shared/ui/state-badge/StateBadge';
import { cn } from '@/shared/utils/cn';
import ReservationCardInfo from './ReservationCardInfo';

export type ReservationCardData = {
  id: number;
  nickname: string;
  userId: number;
  activity: {
    bannerImageUrl: string;
    title: string;
    id: number;
  };
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
};

export type ReservationCardProps = {
  data: ReservationCardData;
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
  return (
    <div className={cn('flex items-center rounded-3xl', cardWrapStyles)}>
      {/* 이미지 */}
      <BaseCardImage containerClassName={cardImageStyles} alt={data.activity.title} />
      {/* 정보 영역 */}
      <div className="relative z-10 w-full">
        <ReservationCardInfo data={data} />
      </div>
    </div>
  );
}
