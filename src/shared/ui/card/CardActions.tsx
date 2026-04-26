import Link from 'next/link';
import Button from '@/shared/ui/button/Button';
import { ReservationStatus } from '@/shared/ui/state-badge/StateBadge';

type CardActionsProps = {
  status: ReservationStatus;
  onEdit?: () => void;
  onDelete?: () => void;
  onReview?: () => void;
};

export default function CardActions({ status, onEdit, onDelete, onReview }: CardActionsProps) {
  if (status === 'confirmed') {
    return (
      <div className="flex gap-2">
        <Button
          as={Link}
          href="/"
          theme="secondary"
          size="sm"
          className="w-17 rounded-lg"
          onClick={onEdit}
        >
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

  if (status === 'completed') {
    return <Button onClick={onReview}>후기 작성하기</Button>;
  }

  return null;
}
