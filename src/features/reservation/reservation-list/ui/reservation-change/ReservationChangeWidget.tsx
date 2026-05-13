'use client';

import HeadCountControl from '@/features/reservation/activity-panel/ui/HeadCountControl';
import ReservationCalendar from '@/features/reservation/activity-panel/ui/ReservationCalendar';
import ScheduleList from '@/features/reservation/activity-panel/ui/ScheduleList';
import { useReservationChange } from '@/features/reservation/reservation-list/hooks/useReservationChange';
import type { MyReservation } from '@/features/reservation/types';
import Button from '@/shared/ui/button/Button';

type ReservationChangeWidgetProps = {
  reservation: MyReservation;
  onSuccess?: () => void;
};

export default function ReservationChangeWidget({
  reservation,
  onSuccess,
}: ReservationChangeWidgetProps) {
  const {
    selected,
    setSelected,
    headCount,
    setHeadCount,
    selectedScheduleId,
    setSelectedScheduleId,
    month,
    setMonth,
    schedules,
    availableDates,
    myBlockedScheduleIds,
    isUpdating,
    submit,
  } = useReservationChange(reservation);

  const handleSubmit = async () => {
    const ok = await submit();
    if (ok) onSuccess?.();
  };

  return (
    <div className="flex flex-col gap-6">
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

      {selectedScheduleId && (
        <HeadCountControl
          headCount={headCount}
          onDecrease={() => setHeadCount((prev) => Math.max(1, prev - 1))}
          onIncrease={() => setHeadCount((prev) => prev + 1)}
          variant="wide"
          rounded="xl"
        />
      )}

      <ScheduleList
        selected={selected}
        schedules={schedules}
        selectedScheduleId={selectedScheduleId}
        onSelectSchedule={(id) => setSelectedScheduleId(id)}
        disabledScheduleIds={myBlockedScheduleIds}
        className="border-b border-gray-50"
      />

      <Button
        theme="primary"
        size="lg"
        disabled={!selected || !selectedScheduleId || isUpdating}
        isLoading={isUpdating}
        onClick={handleSubmit}
        type="button"
        className="w-full"
      >
        예약 변경
      </Button>
    </div>
  );
}
