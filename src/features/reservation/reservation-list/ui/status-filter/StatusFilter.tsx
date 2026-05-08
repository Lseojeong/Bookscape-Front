import FilterButton from '@/shared/ui/filter-button/FilterButton';
import type { ReservationStatus } from '@/shared/ui/state-badge/StateBadge';

const STATUS_LIST: Array<{ id: ReservationStatus; label: string }> = [
  { id: 'confirmed', label: '예약 완료' },
  { id: 'canceled', label: '예약 취소' },
  { id: 'pending', label: '예약 승인' },
  { id: 'declined', label: '예약 거절' },
  { id: 'completed', label: '체험 완료' },
];

type StatusFilterProps = {
  selectedStatus: ReservationStatus | '';
  onSelectStatus: (status: ReservationStatus | '') => void;
};

/**
 * 예약 도메인의 예약 상태를 필터링하는 컴포넌트입니다.
 * 이미 선택된 상태 버튼을 다시 클릭하면 필터를 해제합니다.
 * * @example
 * ```tsx
 * import { useState } from 'react';
 * import StatusFilter from '@/features/reservation/ui/status-filter/StatusFilter';
 * export default function MyReservationPage() {
 * const [status, setStatus] = useState('');
 * return (
 * <StatusFilter
 * selectedStatus={status}
 * onSelectStatus={setStatus}
 * />
 * );
 * }
 * ```
 */
export default function StatusFilter({ selectedStatus, onSelectStatus }: StatusFilterProps) {
  return (
    <div className="scrollbar-hide flex flex-nowrap gap-2 overflow-x-auto overflow-y-hidden md:flex-wrap md:overflow-x-visible">
      {STATUS_LIST.map(({ id, label }) => (
        <FilterButton
          key={id}
          isSelected={selectedStatus === id}
          className="shrink-0"
          onClick={() => {
            // 이미 선택된 것을 누르면 선택 해제, 아니면 해당 상태로 변경
            onSelectStatus(selectedStatus === id ? '' : id);
          }}
        >
          {label}
        </FilterButton>
      ))}
    </div>
  );
}
