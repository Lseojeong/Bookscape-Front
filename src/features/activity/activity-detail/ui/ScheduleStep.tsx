'use client';

import { cn } from '@/shared/utils/cn';
import HeadCountControl from './HeadCountControl';
import ReservationCalendar from './ReservationCalendar';

// TODO: API 연결 후 제거
const MOCK_SCHEDULES = [
  { id: 1, startTime: '14:00', endTime: '15:00' },
  { id: 2, startTime: '15:00', endTime: '16:00' },
];

type ScheduleStepProps = {
  selected?: Date;
  selectedScheduleId?: number;
  headCount: number;
  onSelectDate: (date: Date | undefined) => void;
  onSelectSchedule: (id: number) => void;
  onDecrease: () => void;
  onIncrease: () => void;
};

/**
 * 예약 날짜와 시간을 선택하는 스텝 컴포넌트입니다.
 *
 * ReservationBar 바텀시트의 첫 번째 단계로, 날짜 선택 후 시간 슬롯을 선택할 수 있습니다.
 * 태블릿에서는 참여 인원 수 조절 영역도 함께 표시됩니다.
 *
 * @example
 * ```tsx
 * <ScheduleStep
 *   selected={selected}
 *   selectedScheduleId={selectedScheduleId}
 *   onSelectDate={(date) => setSelected(date)}
 *   onSelectSchedule={(id) => setSelectedScheduleId(id)}
 * />
 * ```
 */
export default function ScheduleStep({
  selected,
  selectedScheduleId,
  headCount,
  onSelectDate,
  onSelectSchedule,
  onDecrease,
  onIncrease,
}: ScheduleStepProps) {
  return (
    <div className="md:flex md:justify-center md:gap-6 md:py-6">
      {/* 달력 */}
      <div>
        <ReservationCalendar selected={selected} onSelect={onSelectDate} />
      </div>
      {/* 예약 가능한 시간 */}
      <div className="mt-6 md:w-75 md:rounded-2xl md:p-6 md:shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <p className="mb-3 typo-16-bold text-gray-950">예약 가능한 시간</p>
        {!selected ? (
          <div className="mb-8 flex items-center justify-center">
            <p className="typo-16-medium text-gray-500">날짜를 선택해주세요.</p>
          </div>
        ) : (
          <div className="mb-8 flex flex-col gap-2">
            {MOCK_SCHEDULES.map((schedule) => (
              <button
                key={schedule.id}
                onClick={() => onSelectSchedule(schedule.id)}
                className={cn(
                  'w-full rounded-xl border py-3 text-center typo-16-medium transition-colors',
                  selectedScheduleId === schedule.id
                    ? 'border-primary-300 border-2 bg-primary-50 text-primary-500'
                    : 'border-gray-300 bg-white text-gray-950'
                )}
              >
                {schedule.startTime}~{schedule.endTime}
              </button>
            ))}
          </div>
        )}

        {/* 참여 인원 수 — 태블릿에서만 표시 */}
        <div className="hidden md:mt-6 md:block">
          <HeadCountControl
            headCount={headCount}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            variant="wide"
          />
        </div>
      </div>
    </div>
  );
}
