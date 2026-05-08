import { cn } from '@/shared/utils/cn';

type ReservationBadgeType = 'completed' | 'pending' | 'confirmed';

type ReservationBadgeProps = {
  type: ReservationBadgeType;
  count: number;
};

const BADGE_STYLE: Record<ReservationBadgeType, string> = {
  completed: 'bg-gray-50 text-gray-500',
  confirmed: 'bg-blue-100 text-primary-500',
  pending: 'bg-orange-100 text-orange-400',
} as const;

const BADGE_LABEL: Record<ReservationBadgeType, string> = {
  completed: '완료',
  pending: '예약',
  confirmed: '승인',
} as const;

export default function ReservationBadge({ type, count }: ReservationBadgeProps) {
  if (count === 0) return null;
  return (
    <span
      className={cn(
        'flex items-center justify-center rounded pt-px typo-12-medium md:pt-0 md:typo-14-medium',
        BADGE_STYLE[type]
      )}
    >
      {BADGE_LABEL[type]} {count}
    </span>
  );
}
