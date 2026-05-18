'use client';

import { ActivityScheduleTime } from '@/features/activity/types';
import Button from '@/shared/ui/button/Button';
import Loading from '@/shared/ui/loading/Loading';
import { cn } from '@/shared/utils/cn';
import { formatEndTime } from '@/shared/utils/time';

type ScheduleListProps = {
  selected?: Date;
  schedules: ActivityScheduleTime[];
  selectedScheduleId?: number;
  onSelectSchedule: (id: number) => void;
  disabledScheduleIds?: Set<number>;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
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
 *   isLoading={isLoading}
 *   isError={isError}
 *   onRetry={refetch}
 * />
 * ```
 */
export default function ScheduleList({
  selected,
  schedules,
  selectedScheduleId,
  onSelectSchedule,
  disabledScheduleIds,
  isLoading,
  isError,
  onRetry,
  className,
  emptyClassName,
}: ScheduleListProps) {
  const now = new Date();
  const isToday = selected ? selected.toDateString() === now.toDateString() : false;

  const isPastSchedule = (startTime: string) => {
    if (!isToday) return false;
    const [hour, minute] = startTime.split(':').map(Number);
    return hour * 60 + minute <= now.getHours() * 60 + now.getMinutes();
  };

  const renderContent = () => {
    if (isLoading)
      return (
        <div className={cn('mb-4 flex items-center justify-center', emptyClassName)}>
          <Loading size={18} color="var(--color-gray-400)" />
        </div>
      );
    if (isError)
      return (
        <div className={cn('mb-4 flex flex-col items-center gap-3', emptyClassName)}>
          <p className="typo-16-medium text-gray-500">일정을 불러오지 못했어요.</p>
          <Button
            type="button"
            theme="secondary"
            size="sm"
            onClick={() => onRetry?.()}
            disabled={!onRetry}
          >
            다시 시도하기
          </Button>
        </div>
      );
    if (!selected)
      return (
        <p className={cn('mb-4 typo-16-medium text-gray-500', emptyClassName)}>
          날짜를 선택해주세요.
        </p>
      );
    if (schedules.length === 0)
      return (
        <p className={cn('mb-4 typo-16-medium text-gray-500', emptyClassName)}>
          예약 가능한 시간이 없습니다.
        </p>
      );

    return (
      <div className="mb-12.5 flex flex-col gap-3 lg:mb-8">
        {schedules.map((schedule) => {
          const isDisabled =
            disabledScheduleIds?.has(schedule.id) || isPastSchedule(schedule.startTime);
          return (
            <button
              key={schedule.id}
              onClick={() => !isDisabled && onSelectSchedule(schedule.id)}
              disabled={isDisabled}
              type="button"
              className={cn(
                'w-full rounded-xl border py-3 text-center typo-16-medium transition-colors',
                isDisabled
                  ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
                  : selectedScheduleId === schedule.id
                    ? 'border-primary-300 border-2 bg-primary-100 text-primary-500'
                    : 'border-gray-300 text-gray-950'
              )}
            >
              {schedule.startTime}~{formatEndTime(schedule.endTime)}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className={className}>
      <p className="mb-3 typo-16-bold text-gray-950">예약 가능한 시간</p>
      {renderContent()}
    </div>
  );
}
