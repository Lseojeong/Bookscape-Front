import Link from 'next/link';
import Button from '@/shared/ui/button/Button';
import { ReservationStatus } from '@/shared/ui/state-badge/StateBadge';

type CardActionsProps = {
  type: 'manage' | 'reservation';
  status?: ReservationStatus;
  reviewSubmitted?: boolean; // 리뷰 작성 여부
  // TODO : 페이지 이동 및 모달 기능 연결 필요
  onDelete?: () => void;
  onReview?: () => void;
};

export default function CardActions({
  type,
  status,
  reviewSubmitted,
  onDelete,
  onReview,
}: CardActionsProps) {
  // 내 체험 관리 버튼
  if (type === 'manage') {
    return (
      <div className="flex gap-2">
        {/* TODO : 내 체험 수정 페이지 링크 연결 */}
        <Button as={Link} href="/" theme="secondary" size="sm" className="w-17 rounded-lg">
          수정하기
        </Button>
        <Button
          as={Link}
          href="/"
          theme="gray"
          size="sm"
          className="w-17 rounded-lg"
          onClick={onDelete}
        >
          삭제하기
        </Button>
      </div>
    );
  }

  // 예약 완료 시 버튼
  if (status === 'confirmed') {
    return (
      <div className="flex gap-2">
        {/* TODO : 체험 상세페이지 링크 연결 */}
        <Button as={Link} href="/" theme="secondary" size="sm" className="w-17 rounded-lg">
          예약 변경
        </Button>
        <Button type="button" theme="gray" size="sm" className="w-17 rounded-lg" onClick={onDelete}>
          예약 취소
        </Button>
      </div>
    );
  }

  // 체험 완료 시 버튼
  if (status === 'completed') {
    return reviewSubmitted ? (
      <Button
        theme="gray"
        size="sm"
        className="rounded-lg px-2.5 py-1.5"
        disabled
        onClick={onReview}
      >
        후기 작성 완료
      </Button>
    ) : (
      <Button size="sm" className="rounded-lg px-2.5 py-1.5" onClick={onReview}>
        후기 작성하기
      </Button>
    );
  }

  return null;
}
