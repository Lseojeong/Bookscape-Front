import BaseCardImage from '@/shared/ui/card/base/BaseCardImage';
import ReservationCardInfo from '@/shared/ui/card/reservation-card/ReservationCardInfo';
import { ReservationStatus } from '@/shared/ui/state-badge/StateBadge';

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
 * <ReservationCard
 *   data={{
 *     id: 1,
 *     nickname: '홍길동',
 *     userId: 10,
 *     activity: {
 *       id: 100,
 *       title: '한강 요트 체험',
 *       bannerImageUrl: 'https://example.com/image.jpg',
 *     },
 *     teamId: 'team-1',
 *     activityId: 100,
 *     scheduleId: 200,
 *     status: 'confirmed',
 *     reviewSubmitted: false,
 *     totalPrice: 70000,
 *     headCount: 2,
 *     date: '2024-04-01',
 *     startTime: '14:00',
 *     endTime: '16:00',
 *   }}
 * />
 * ```
 */
export default function ReservationCard({ data }: ReservationCardProps) {
  return (
    <div className="relative flex w-full items-center overflow-hidden rounded-3xl shadow-card">
      {/* 이미지 */}
      <BaseCardImage
        containerClassName="absolute right-0 z-0 w-[145px]"
        alt={data.activity.title}
      />
      {/* 정보 영역 */}
      <div className="relative z-10 w-full">
        <ReservationCardInfo data={data} />
      </div>
    </div>
  );
}
