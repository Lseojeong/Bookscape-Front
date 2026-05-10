'use client';

import { ActivityScheduleTime } from '@/features/activity/types';
import { cn } from '@/shared/utils/cn';

type ScheduleListProps = {
  selected?: Date;
  schedules: ActivityScheduleTime[];
  selectedScheduleId?: number;
  onSelectSchedule: (id: number) => void;
  disabledScheduleIds?: Set<number>;
  className?: string;
  emptyClassName?: string;
};

/**
 * 예약 가능한 시간 슬롯 목록 컴포넌트입니다.
 *
 * 날짜 미선택 시 안내 문구를, 선택 시 시간 슬롯 버튼 목록을 표시합니다.
 *
 * @example
 * ```tsx
 * <ScheduleList
 *   selected={selected}
 *   schedules={schedules}
 *   selectedScheduleId={selectedScheduleId}
 *   onSelectSchedule={(id) => setSelectedScheduleId(id)}
 *   disabledScheduleIds={myBlockedScheduleIds}
 * />
 * ```
 */
export default function ScheduleList({
  selected,
  schedules,
  selectedScheduleId,
  onSelectSchedule,
  disabledScheduleIds,
  className,
  emptyClassName,
}: ScheduleListProps) {
  return (
    <div className={className}>
      <p className="mb-3 typo-16-bold text-gray-950">예약 가능한 시간</p>
      {!selected ? (
        <p className={cn('mb-4 typo-16-medium text-gray-500', emptyClassName)}>
          날짜를 선택해주세요.
        </p>
      ) : (
        <div className="mb-12.5 flex flex-col gap-3 lg:mb-8">
          {schedules.map((schedule) => {
            const isDisabled = disabledScheduleIds?.has(schedule.id);
            return (
              <button
                key={schedule.id}
                onClick={() => !isDisabled && onSelectSchedule(schedule.id)}
                disabled={isDisabled}
                className={cn(
                  'w-full rounded-xl border py-3 text-center typo-16-medium transition-colors',
                  isDisabled
                    ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
                    : selectedScheduleId === schedule.id
                      ? 'border-primary-300 border-2 bg-primary-100 text-primary-500'
                      : 'border-gray-300 text-gray-950'
                )}
              >
                {schedule.startTime}~{schedule.endTime}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
