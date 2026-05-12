'use client';

import { ActivityScheduleTime } from '@/features/activity/types';
import HeadCountControl from '@/features/reservation/activity-panel/ui/HeadCountControl';
import ReservationCalendar from '@/features/reservation/activity-panel/ui/ReservationCalendar';
import ScheduleList from '@/features/reservation/activity-panel/ui/ScheduleList';

type ScheduleStepProps = {
  selected?: Date;
  selectedScheduleId?: number;
  headCount: number;
  schedules: ActivityScheduleTime[];
  month: Date;
  onSelectDate: (date: Date | undefined) => void;
  onSelectSchedule: (id: number) => void;
  onMonthChange: (month: Date) => void;
  onDecrease: () => void;
  onIncrease: () => void;
  onVisitHeadcount?: () => void;
  myBlockedScheduleIds: Set<number>;
  availableDates?: string[];
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
 *   headCount={headCount}
 *   schedules={schedules}
 *   month={month}
 *   onSelectDate={(date) => setSelected(date)}
 *   onSelectSchedule={(id) => setSelectedScheduleId(id)}
 *   onMonthChange={setMonth}
 *   onDecrease={() => setHeadCount((prev) => Math.max(1, prev - 1))}
 *   onIncrease={() => setHeadCount((prev) => prev + 1)}
 * />
 * ```
 */
export default function ScheduleStep({
  selected,
  selectedScheduleId,
  headCount,
  schedules,
  month,
  onSelectDate,
  onSelectSchedule,
  onMonthChange,
  onDecrease,
  onIncrease,
  onVisitHeadcount,
  myBlockedScheduleIds,
  availableDates,
}: ScheduleStepProps) {
  return (
    <div className="md:flex md:justify-center md:gap-6 md:py-6">
      {/* 달력 */}
      <div>
        <ReservationCalendar
          selected={selected}
          month={month}
          onMonthChange={onMonthChange}
          onSelect={onSelectDate}
          availableDates={availableDates}
        />
      </div>
      <div className="mt-6 md:w-75 md:rounded-2xl md:p-6 md:shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        {/* 예약 가능한 시간 */}
        <ScheduleList
          selected={selected}
          schedules={schedules}
          selectedScheduleId={selectedScheduleId}
          disabledScheduleIds={myBlockedScheduleIds}
          onSelectSchedule={onSelectSchedule}
          emptyClassName="mb-8 flex items-center justify-center"
        />

        {/* 참여 인원 수 — 태블릿에서만 표시 */}
        {selectedScheduleId && (
          <div className="hidden md:mt-6 md:block">
            <HeadCountControl
              headCount={headCount}
              onDecrease={() => {
                onDecrease();
                onVisitHeadcount?.();
              }}
              onIncrease={() => {
                onIncrease();
                onVisitHeadcount?.();
              }}
              variant="wide"
              rounded="xl"
            />
          </div>
        )}
      </div>
    </div>
  );
}
