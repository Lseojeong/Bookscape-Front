import Link from 'next/link';
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
  activityId?: number;
};

type CardActionsProps = ManageCardActionsProps | ReservationCardActionsProps;

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
    return (
      <div className="flex gap-2">
        <Button
          as={Link}
          href={`/activity/${props.activityId}/edit`}
          theme="secondary"
          size="sm"
          className="w-17 rounded-lg"
        >
          수정하기
        </Button>
        {/* TODO: 삭제 확인 모달 연결 필요 */}
        <Button
          type="button"
          theme="gray"
          size="sm"
          className="w-17 rounded-lg"
          onClick={() => alert('삭제하기 버튼 클릭')}
        >
          삭제하기
        </Button>
      </div>
    );
  }

  const { status, reviewSubmitted, activityId } = props;

  // 예약 완료 시 버튼
  if (status === 'pending') {
    return (
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
        {/* TODO: 예약 취소 확인 모달 연결 필요 */}
        <Button
          type="button"
          theme="gray"
          size="sm"
          className="w-17 rounded-lg"
          onClick={() => alert('예약 취소 버튼 클릭')}
        >
          예약 취소
        </Button>
      </div>
    );
  }

  // 체험 완료 시 버튼
  if (status === 'completed') {
    return reviewSubmitted ? (
      <Button theme="gray" size="sm" className="rounded-lg px-2.5 py-1.5" disabled>
        후기 작성 완료
      </Button>
    ) : (
      // TODO: 후기 작성 모달 연결 필요
      <Button
        type="button"
        size="sm"
        className="rounded-lg px-2.5 py-1.5"
        onClick={() => alert('후기 작성 버튼 클릭')}
      >
        후기 작성하기
      </Button>
    );
  }

  return null;
}
