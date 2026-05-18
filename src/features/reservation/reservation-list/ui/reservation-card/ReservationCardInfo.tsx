import { useState } from 'react';
import { RESERVATION_UI_MESSAGES } from '@/features/reservation/reservation-list/constants/messages';
import { useExpiredPendingReservation } from '@/features/reservation/reservation-list/hooks/useExpiredPendingReservation';
import { useCreateMyReservationReviewMutation } from '@/features/reservation/reservation-list/mutations/useCreateMyReservationReviewMutation';
import ReviewModal from '@/features/reservation/reservation-list/ui/review-modal/ReviewModal';
import BaseCardInfo from '@/shared/ui/card/base/BaseCardInfo';
import CardActions from '@/shared/ui/card/CardActions';
import { cardInfoStyles } from '@/shared/ui/card/cardStyles';
import TotalPrice from '@/shared/ui/price/TotalPrice';
import StateBadge from '@/shared/ui/state-badge/StateBadge';
import Title from '@/shared/ui/title/Title';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';
import { cn } from '@/shared/utils/cn';
import { formatReservationScheduleText, formatYmdToDot } from '@/shared/utils/dateFormat';
import { formatEndTime } from '@/shared/utils/time';
import type { ReservationCardProps } from './ReservationCard';

/**
 * 예약 카드의 "정보 영역"을 구성하는 컴포넌트입니다.
 *
 * - 예약 상태(status)에 따라 버튼(CardActions)이 동적으로 변경됩니다.
 * - 오른쪽에 이미지가 겹치는 카드 구조이므로, 텍스트 영역이 이미지와 겹치지 않도록 width를 제한합니다.
 *
 * @example
 * ```tsx
 * <ReservationCardInfo data={data} />
 * ```
 */
export default function ReservationCardInfo({
  data,
  onReservationChangeClick,
}: ReservationCardProps) {
  const { id, activity, totalPrice, headCount, status, date, startTime, endTime, reviewSubmitted } =
    data;
  const { title } = activity;
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const { showToast } = useToastStore();
  const createReviewMutation = useCreateMyReservationReviewMutation();

  const displayEndTime = formatEndTime(endTime);

  const scheduleText = formatReservationScheduleText({
    date,
    startTime,
    endTime: displayEndTime,
    headCount,
  });
  const isExpiredPending = useExpiredPendingReservation({ status, date, startTime });
  const pendingDisabledMessage = RESERVATION_UI_MESSAGES.PENDING_CHANGE_DISABLED_EXPIRED;

  return (
    <BaseCardInfo className={cn(cardInfoStyles)}>
      <div className="flex items-center justify-between gap-3">
        {/* 예약 상태 뱃지 */}
        <StateBadge
          status={isExpiredPending ? 'declined' : status}
          labelOverride={
            isExpiredPending ? RESERVATION_UI_MESSAGES.EXPIRED_PENDING_BADGE_LABEL : undefined
          }
          className="w-fit"
        />
      </div>

      {/* 체험명 + 예약 일정 */}
      <div className="mt-2 mb-2 flex flex-col gap-1 lg:mt-3 lg:mb-1.5 lg:gap-2">
        {/* 체험명 (길어질 경우 말줄임) */}
        <Title as="h2" size="16" weight="bold" className="truncate lg:typo-18-bold">
          {title}
        </Title>

        {/* 예약 날짜 + 시간 */}
        <p className="flex gap-1 typo-13-medium text-gray-500 lg:typo-16-medium">
          <span className="hidden lg:inline-block">{formatYmdToDot(date)}</span>
          <span className="hidden lg:inline-block">·</span>
          <span>
            {startTime} - {displayEndTime}
          </span>
        </p>
      </div>

      {/* 가격 + 액션 */}
      <div className="flex flex-col justify-between gap-3 lg:flex-row">
        {/* 총 금액 + 인원 */}
        <TotalPrice totalPrice={totalPrice} headCount={headCount} showSlash={false} />

        {/* 예약 상태 기반 액션 버튼 */}
        <CardActions
          type="reservation"
          status={status}
          reviewSubmitted={reviewSubmitted}
          reservationId={id}
          activityId={activity.id}
          onReviewClick={() => setIsReviewOpen(true)}
          onReservationChangeClick={() => onReservationChangeClick?.(data)}
          isChangeDisabled={isExpiredPending}
          changeDisabledMessage={isExpiredPending ? pendingDisabledMessage : undefined}
        />
      </div>

      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        activityTitle={title}
        scheduleText={scheduleText}
        onSubmit={async ({ rating, content }) => {
          try {
            await createReviewMutation.mutateAsync({
              reservationId: id,
              body: { rating, content },
            });
            showToast('check', '후기가 등록되었습니다.');
          } catch {
            showToast('cancel', '후기 등록에 실패했습니다.');
            throw new Error('review submit failed');
          }
        }}
      />
    </BaseCardInfo>
  );
}
