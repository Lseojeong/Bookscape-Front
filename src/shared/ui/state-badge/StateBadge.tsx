import { cn } from '@/shared/utils/cn';

export type ReservationStatus = 'pending' | 'confirmed' | 'completed' | 'declined' | 'canceled';

export type StateBadgeProps = {
  status: ReservationStatus;
  className?: string;
};

/**
 * 예약 상태별 뱃지 스타일 및 라벨 맵
 */
const RESERVATION_BADGE_MAP: Record<ReservationStatus, { label: string; className: string }> = {
  pending: {
    label: '예약 승인',
    className: 'bg-mint-100 text-mint-400',
  },
  confirmed: {
    label: '예약 완료',
    className: 'bg-green-100 text-green-400',
  },
  completed: {
    label: '체험 완료',
    className: 'bg-blue-100 text-blue-400',
  },
  declined: {
    label: '예약 거절',
    className: 'bg-red-100 text-red-400',
  },
  canceled: {
    label: '예약 취소',
    className: 'bg-gray-100 text-gray-600',
  },
};

/**
 * 예약 상태를 표시하는 뱃지 컴포넌트입니다.
 *
 * API에서 오는 예약 상태값(`ReservationStatus`)에 따라
 * 색상과 라벨이 자동으로 변경됩니다.
 *
 * @example 기본 사용
 * ```tsx
 * <StateBadge status="pending" />
 * ```
 *
 * @example API 데이터 연동
 * ```tsx
 * <StateBadge status={reservations.status} />
 * ```
 */
export default function StateBadge({ status, className }: StateBadgeProps) {
  const { label, className: badgeClassName } = RESERVATION_BADGE_MAP[status];

  return (
    <span
      className={cn(
        // 'inline-block h-6 rounded-full px-2 pt-px align-middle typo-13-bold leading-6',
        'inline-flex h-6 items-center rounded-full px-2 pt-px align-middle typo-13-bold',
        badgeClassName,
        className
      )}
    >
      {label}
    </span>
  );
}
