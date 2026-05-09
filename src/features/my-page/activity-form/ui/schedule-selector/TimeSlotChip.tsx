'use client';

import type { ReactNode } from 'react';
import { DeleteIcon } from '@/shared/assets/icons';

type TimeSlotChipProps = {
  children: ReactNode;
  onRemove: () => void;
};

/**
 * ScheduleSelector 내부에서 등록된 시간대를 표시하고 삭제하는 칩 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <TimeSlotChip onRemove={() => handleRemove(index)}>
 *   12:00 ~ 14:00
 * </TimeSlotChip>
 * ```
 */
export default function TimeSlotChip({ children, onRemove }: TimeSlotChipProps) {
  return (
    <div className="flex h-10 items-center gap-2.5 rounded-full bg-gray-50 px-3 py-2 typo-14-semibold text-gray-900">
      <span>{children}</span>

      <button
        type="button"
        onClick={onRemove}
        className="flex h-6 w-6 items-center justify-center rounded-full text-gray-900 transition-colors hover:bg-gray-200 focus:ring-2 focus:ring-primary-500 focus:outline-none"
        aria-label="등록된 시간대 삭제"
      >
        <DeleteIcon className="h-full w-full" aria-hidden="true" />
      </button>
    </div>
  );
}
