'use client';

import { useState } from 'react';
import HeadcountStep from '@/features/reservation/activity-panel/ui/HeadcountStep';
import ScheduleStep from '@/features/reservation/activity-panel/ui/ScheduleStep';
import { useReservationChange } from '@/features/reservation/reservation-list/hooks/useReservationChange';
import type { MyReservation } from '@/features/reservation/types';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import BottomSheet from '@/shared/ui/bottom-sheet/BottomSheet';
import Button from '@/shared/ui/button/Button';
import { cn } from '@/shared/utils/cn';

type ReservationChangeSheetProps = {
  isOpen: boolean;
  reservation: MyReservation;
  onClose: () => void;
};

export default function ReservationChangeSheet({
  isOpen,
  reservation,
  onClose,
}: ReservationChangeSheetProps) {
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
    reset,
    handleChangeReservation,
  } = useReservationChange(reservation);

  const [step, setStep] = useState<'schedule' | 'headcount'>('schedule');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const canSubmit = Boolean(selected && selectedScheduleId);
  const isScheduleStep = step === 'schedule';
  const primaryButtonLabel = isScheduleStep && isMobile ? '다음으로' : '예약 변경';

  const handlePrimaryButtonClick = async () => {
    if (isScheduleStep && isMobile) {
      setStep('headcount');
      return;
    }
    await handleChangeReservation();
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setStep('schedule');
    reset();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={handleClose}
      ariaLabel="예약 변경"
      surfaceClassName={cn('h-auto! max-h-[90dvh]! px-7.5', step === 'headcount' && 'max-h-none!')}
    >
      <div className="flex-1 overflow-y-auto">
        {step === 'schedule' ? (
          <ScheduleStep
            selected={selected}
            selectedScheduleId={selectedScheduleId}
            headCount={headCount}
            schedules={schedules}
            month={month}
            onSelectDate={(date) => {
              setSelected(date);
              setSelectedScheduleId(undefined);
            }}
            onSelectSchedule={(id) => {
              setSelectedScheduleId(id);
            }}
            onMonthChange={setMonth}
            onDecrease={() => setHeadCount((prev) => Math.max(1, prev - 1))}
            onIncrease={() => setHeadCount((prev) => prev + 1)}
            myBlockedScheduleIds={myBlockedScheduleIds}
            availableDates={availableDates}
          />
        ) : (
          <HeadcountStep
            headCount={headCount}
            onBack={() => setStep('schedule')}
            onDecrease={() => setHeadCount((prev) => Math.max(1, prev - 1))}
            onIncrease={() => setHeadCount((prev) => prev + 1)}
          />
        )}
      </div>
      <div className="relative shrink-0 pb-7">
        <Button
          theme="primary"
          size="lg"
          className="w-full"
          disabled={!canSubmit || isUpdating}
          isLoading={isUpdating}
          type="button"
          onClick={handlePrimaryButtonClick}
        >
          {primaryButtonLabel}
        </Button>
      </div>
    </BottomSheet>
  );
}
