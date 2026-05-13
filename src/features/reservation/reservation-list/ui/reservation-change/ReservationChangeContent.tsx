'use client';

import { useMemo, useState } from 'react';
import HeadCountControl from '@/features/reservation/activity-panel/ui/HeadCountControl';
import HeadcountStep from '@/features/reservation/activity-panel/ui/HeadcountStep';
import ReservationCalendar from '@/features/reservation/activity-panel/ui/ReservationCalendar';
import ScheduleList from '@/features/reservation/activity-panel/ui/ScheduleList';
import ScheduleStep from '@/features/reservation/activity-panel/ui/ScheduleStep';
import { useReservationChange } from '@/features/reservation/reservation-list/hooks/useReservationChange';
import type { MyReservation } from '@/features/reservation/types';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import Button from '@/shared/ui/button/Button';

type ReservationChangeContentProps = {
  variant: 'panel' | 'sheet';
  reservation: MyReservation;
  onClose: () => void;
};

/**
 * ## ReservationChangeContent
 *
 * 예약 변경 UI의 "내용" 컴포넌트입니다.
 *
 * @remarks
 * - 컨테이너(`ReservationChangePanel`, `ReservationChangeSheet`)와 분리되어 있어
 *   동일한 로직/상태를 PC 패널과 모바일 시트에서 재사용합니다.
 * - 성공 시에는 내부에서 `onClose()`를 호출하고, 선택 상태를 초기화합니다.
 *
 * @param variant `panel`(PC) 또는 `sheet`(모바일)
 * @param reservation 변경 대상 예약
 * @param onClose overlay 닫기 콜백
 */
export default function ReservationChangeContent({
  variant,
  reservation,
  onClose,
}: ReservationChangeContentProps) {
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
    submit,
  } = useReservationChange(reservation);

  const isMobile = useMediaQuery('(max-width: 767px)');
  const [step, setStep] = useState<'schedule' | 'headcount'>('schedule');

  const isScheduleStep = step === 'schedule';
  const canSubmit = useMemo(
    () => Boolean(selected && selectedScheduleId),
    [selected, selectedScheduleId]
  );

  const handleClose = () => {
    onClose();
    setStep('schedule');
    reset();
  };

  // PC
  if (variant === 'panel') {
    const handleSubmit = async () => {
      const ok = await submit();
      if (ok) handleClose();
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
          disabled={!canSubmit || isUpdating}
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

  // Mobile Sheet Variant
  const primaryButtonLabel = isScheduleStep && isMobile ? '다음으로' : '예약 변경';

  const handlePrimaryButtonClick = async () => {
    if (isScheduleStep && isMobile) {
      setStep('headcount');
      return;
    }

    const ok = await submit();
    if (ok) handleClose();
  };

  return (
    <>
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
    </>
  );
}
