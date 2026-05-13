'use client';

import { useMemo, useState } from 'react';
import HeadCountControl from '@/features/reservation/activity-panel/ui/HeadCountControl';
import HeadcountStep from '@/features/reservation/activity-panel/ui/HeadcountStep';
import ReservationCalendar from '@/features/reservation/activity-panel/ui/ReservationCalendar';
import ScheduleList from '@/features/reservation/activity-panel/ui/ScheduleList';
import ScheduleStep from '@/features/reservation/activity-panel/ui/ScheduleStep';
import { useReservationChange } from '@/features/reservation/reservation-list/hooks/useReservationChange';
import type { MyReservation } from '@/features/reservation/types';
import Button from '@/shared/ui/button/Button';

type ReservationChangeContentProps = {
  variant: 'panel' | 'sheet';
  reservation: MyReservation;
  onClose: () => void;
};

/**
 * ## ReservationChangeContent
 *
 * 예약 변경 UI의 공통 “콘텐츠” 컴포넌트입니다.
 *
 * @description
 * `ReservationChangePanel`(PC 우측 패널)과 `ReservationChangeSheet`(모바일/태블릿 바텀시트)에서
 * 동일한 상태/로직을 재사용하기 위해 컨테이너와 분리된 형태로 구성됩니다.
 *
 * @remarks
 * - 내부에서 `useReservationChange`를 사용해 날짜/시간/인원 선택 상태와 제출(`submit`) 로직을 관리합니다.
 * - `variant="sheet"`는 2-step(일정 선택 → 인원 선택) 플로우를 사용합니다.
 * - `variant="panel"`은 1-step(일정/인원 선택 후 바로 제출) 플로우를 사용합니다.
 * - 제출 성공 시 `onClose()`를 호출하고, step 및 선택 상태를 초기화합니다.
 *
 * @example
 * ```tsx
 * <ReservationChangeContent
 *   variant="sheet"
 *   reservation={reservation}
 *   onClose={() => setIsOpen(false)}
 * />
 * ```
 *
 * @param props.variant UI 변형: `panel`(PC) 또는 `sheet`(모바일/태블릿)
 * @param props.reservation 변경 대상 예약 정보
 * @param props.onClose overlay 닫기 콜백
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
  const primaryButtonLabel = isScheduleStep ? '다음으로' : '예약 변경';

  const handlePrimaryButtonClick = async () => {
    if (isScheduleStep) {
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
