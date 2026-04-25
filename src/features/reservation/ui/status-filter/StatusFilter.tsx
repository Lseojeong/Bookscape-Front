import FilterButton from '@/shared/ui/filter-button/FilterButton';

const STATUS_LIST = ['예약 완료', '예약 취소', '예약 승인', '예약 거절', '체험 완료'];

type StatusFilterProps = {
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
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
    <div className="flex flex-wrap gap-2">
      {STATUS_LIST.map((status) => (
        <FilterButton
          key={status}
          isSelected={selectedStatus === status}
          onClick={() => {
            // 이미 선택된 것을 누르면 선택 해제, 아니면 해당 상태로 변경
            onSelectStatus(selectedStatus === status ? '' : status);
          }}
        >
          {status}
        </FilterButton>
      ))}
    </div>
  );
}
