'use client';

import type { ActivityDetail, ActivitySchedule } from '@/features/activity/types';
import { useReservation } from '@/features/reservation/activity-panel/hooks/useReservation';
import HeadCountControl from '@/features/reservation/activity-panel/ui/HeadCountControl';
import ReservationCalendar from '@/features/reservation/activity-panel/ui/ReservationCalendar';
import ScheduleList from '@/features/reservation/activity-panel/ui/ScheduleList';
import Button from '@/shared/ui/button/Button';
import PerPersonPrice from '@/shared/ui/price/PerPersonPrice';
import PriceDisplay from '@/shared/ui/price/PriceDisplay';

type ReservationWidgetProps = {
  activityId: number;
  initialActivityData?: ActivityDetail;
  initialScheduleData?: ActivitySchedule[];
  initialScheduleYear?: string;
  initialScheduleMonth?: string;
};

/**
 * PC 사이드바 예약 위젯 컴포넌트입니다.
 *
 * 1인당 가격, 날짜 선택 달력, 참여 인원 수 조절, 예약 가능한 시간 선택, 총 합계 및 예약하기 버튼을 포함합니다.
 * 날짜와 시간을 모두 선택해야 예약하기 버튼이 활성화됩니다.
 *
 * @example
 * ```tsx
 * <ReservationWidget
 *   activityId={activityId}
 *   initialActivityData={initialActivityData}
 *   initialScheduleData={initialScheduleData}
 *   initialScheduleYear={initialScheduleYear}
 *   initialScheduleMonth={initialScheduleMonth}
 * />
 * ```
 */
export default function ReservationWidget({
  activityId,
  initialActivityData,
  initialScheduleData,
  initialScheduleYear,
  initialScheduleMonth,
}: ReservationWidgetProps) {
  const {
    price,
    selected,
    setSelected,
    headCount,
    setHeadCount,
    selectedScheduleId,
    setSelectedScheduleId,
    month,
    setMonth,
    schedules,
    handleReserve,
    isOwner,
    myBlockedScheduleIds,
    availableDates,
    isScheduleLoading,
    isScheduleError,
    refetchSchedule,
  } = useReservation(activityId, {
    initialActivityData,
    initialScheduleData,
    initialScheduleYear,
    initialScheduleMonth,
  });

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-gray-50 p-7.5 shadow-card">
      {/* 가격 */}
      <PerPersonPrice pricePerPerson={price} />

      {/* 달력 */}
      <ReservationCalendar
        selected={selected}
        month={month}
        onMonthChange={setMonth}
        onSelect={(date) => {
          setSelected(date);
          setSelectedScheduleId(undefined);
        }}
        availableDates={availableDates}
      />

      {/* 참여 인원 수 */}
      {selectedScheduleId && (
        <HeadCountControl
          headCount={headCount}
          onDecrease={() => setHeadCount((prev) => Math.max(1, prev - 1))}
          onIncrease={() => setHeadCount((prev) => prev + 1)}
        />
      )}

      {/* 예약 가능한 시간 */}
      <ScheduleList
        selected={selected}
        schedules={schedules}
        selectedScheduleId={selectedScheduleId}
        onSelectSchedule={(id) => setSelectedScheduleId(id)}
        disabledScheduleIds={myBlockedScheduleIds}
        isLoading={isScheduleLoading}
        isError={isScheduleError}
        onRetry={refetchSchedule}
        className="border-b border-gray-50"
      />

      {/* 총 합계 + 예약하기 버튼 */}
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <p className="typo-20-medium text-gray-500">총 합계</p>
          <PriceDisplay price={price * headCount} unit="" showSlash={false} />
        </div>
        <Button
          theme="primary"
          size="md"
          disabled={isOwner || !selected || !selectedScheduleId}
          onClick={handleReserve}
          type="button"
        >
          예약하기
        </Button>
      </div>
    </div>
  );
}
