'use client';

import Link from 'next/link';
import { useState } from 'react';
import DeleteActivityDialog from '@/features/my-page/common/ui/DeleteActivityDialog';
import CancelReservationDialog from '@/features/reservation/reservation-list/ui/CancelReservationDialog';
import Button from '@/shared/ui/button/Button';
import { ReservationStatus } from '@/shared/ui/state-badge/StateBadge';

type ManageCardActionsProps = {
  type: 'manage';
  activityId: number;
};

type ReservationCardActionsProps = {
  type: 'reservation';
  status: ReservationStatus;
  reviewSubmitted?: boolean;
  reservationId?: number;
  activityId?: number;
  onReviewClick?: () => void;
};

type CardActionsProps = ManageCardActionsProps | ReservationCardActionsProps;

function ManageCardActions({ activityId }: { activityId: number }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <div className="flex gap-2">
        <Button
          as={Link}
          href={`/activity/${activityId}/edit`}
          theme="secondary"
          size="sm"
          className="w-17 rounded-lg"
        >
          수정하기
        </Button>
        <Button
          type="button"
          theme="gray"
          size="sm"
          className="w-17 rounded-lg"
          onClick={() => setIsDeleteOpen(true)}
        >
          삭제하기
        </Button>
      </div>

      <DeleteActivityDialog
        id={activityId}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
      />
    </>
  );
}

function PendingReservationCardActions({
  reservationId,
  activityId,
}: {
  reservationId: number;
  activityId: number;
}) {
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  return (
    <>
      <div className="flex gap-2">
        <Button
          as={Link}
          href={`/activity/${activityId}`}
          theme="secondary"
          size="sm"
          className="w-17 rounded-lg"
        >
          예약 변경
        </Button>
        <Button
          type="button"
          theme="gray"
          size="sm"
          className="w-17 rounded-lg"
          onClick={() => setIsCancelOpen(true)}
        >
          예약 취소
        </Button>
      </div>

      <CancelReservationDialog
        reservationId={reservationId}
        isOpen={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
      />
    </>
  );
}

/**
 * 체험/예약 카드 하단의 액션 버튼 컴포넌트입니다.
 *
 * type에 따라 내 체험 관리(manage)와 예약 내역(reservation) 두 가지 버전으로 렌더링됩니다.
 * - manage: 수정하기 / 삭제하기 버튼
 * - reservation: 예약 상태(status)에 따라 버튼이 다르게 노출됩니다.
 *   - pending: 예약 변경 / 예약 취소 버튼
 *   - completed: 후기 작성하기 / 후기 작성 완료(비활성) 버튼
 *
 * @example
 * ```tsx
 * // 내 체험 관리 카드
 * <CardActions type="manage" activityId={1} />
 *
 * // 예약 완료 카드
 * <CardActions type="reservation" status="pending" activityId={1} />
 *
 * // 체험 완료 카드 - 후기 미작성
 * <CardActions type="reservation" status="completed" reviewSubmitted={false} />
 *
 * // 체험 완료 카드 - 후기 작성 완료
 * <CardActions type="reservation" status="completed" reviewSubmitted={true} />
 * ```
 */
export default function CardActions(props: CardActionsProps) {
  // 내 체험 관리 버튼
  if (props.type === 'manage') {
    return <ManageCardActions activityId={props.activityId} />;
  }

  const { status, reviewSubmitted, activityId } = props;

  // 예약 완료 시 버튼
  if (status === 'pending') {
    if (!activityId || !props.reservationId) return null;
    return (
      <PendingReservationCardActions reservationId={props.reservationId} activityId={activityId} />
    );
  }

  // 체험 완료 시 버튼
  if (status === 'completed') {
    return reviewSubmitted ? (
      <Button theme="gray" size="sm" className="rounded-lg px-2.5 py-1.5" disabled>
        후기 작성 완료
      </Button>
    ) : (
      <Button
        type="button"
        size="sm"
        className="rounded-lg px-2.5 py-1.5"
        onClick={props.onReviewClick}
      >
        후기 작성하기
      </Button>
    );
  }

  return null;
}
