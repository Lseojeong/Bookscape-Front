'use client';

import { useState } from 'react';
import type { ActivityDetail, ActivitySchedule } from '@/features/activity/types';
import { useReservation } from '@/features/reservation/activity-panel/hooks/useReservation';
import HeadcountStep from '@/features/reservation/activity-panel/ui/HeadcountStep';
import ScheduleStep from '@/features/reservation/activity-panel/ui/ScheduleStep';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import BottomSheet from '@/shared/ui/bottom-sheet/BottomSheet';
import Button from '@/shared/ui/button/Button';
import TotalPrice from '@/shared/ui/price/TotalPrice';
import { cn } from '@/shared/utils/cn';

type ReservationBarProps = {
  activityId: number;
  initialActivityData?: ActivityDetail;
  initialScheduleData?: ActivitySchedule[];
  initialScheduleYear?: string;
  initialScheduleMonth?: string;
};

/**
 * 태블릿/모바일 하단 고정 예약 바 컴포넌트입니다.
 *
 * 하단에 가격과 예약하기 버튼을 고정으로 표시하며
 * 버튼 클릭 시 달력과 예약 가능한 시간을 선택할 수 있는 바텀시트가 열립니다.
 * 핸들바를 아래로 드래그하면 시트를 닫을 수 있습니다.
 *
 * @example
 * ```tsx
 * <ReservationBar
 *   activityId={activityId}
 *   initialActivityData={initialActivityData}
 *   initialScheduleData={initialScheduleData}
 *   initialScheduleYear={initialScheduleYear}
 *   initialScheduleMonth={initialScheduleMonth}
 * />
 * ```
 */
export default function ReservationBar({
  activityId,
  initialActivityData,
  initialScheduleData,
  initialScheduleYear,
  initialScheduleMonth,
}: ReservationBarProps) {
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
    reset,
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

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'schedule' | 'headcount'>('schedule');

  const isMobile = useMediaQuery('(max-width: 767px)');
  const canReserve = Boolean(selected && selectedScheduleId);
  const isScheduleStep = step === 'schedule';
  const primaryButtonLabel = isScheduleStep && isMobile ? '다음으로' : '예약하기';
  const primaryButtonDisabled = isOwner || !canReserve;

  const handlePrimaryButtonClick = () => {
    if (isScheduleStep && isMobile) {
      goHeadcountStep();
      return;
    }
    handleReserve();
  };

  const handleClose = () => {
    setIsOpen(false);
    setStep('schedule');
    reset();
  };

  const goHeadcountStep = () => {
    setStep('headcount');
  };

  return (
    <div className="fixed right-0 bottom-0 left-0 layer-header lg:hidden">
      <div className="flex flex-col gap-2 border-t border-gray-100 bg-white px-4 py-3 pb-8">
        <div className="my-3.5">
          <TotalPrice totalPrice={price} headCount={1} />
        </div>
        <Button
          theme="primary"
          size="md"
          className="w-full"
          disabled={isOwner}
          type="button"
          onClick={() => setIsOpen(true)}
        >
          예약하기
        </Button>
      </div>
      <BottomSheet
        isOpen={isOpen}
        onClose={handleClose}
        ariaLabel="예약 날짜 선택"
        surfaceClassName={cn(
          'h-auto! max-h-[90dvh]! px-7.5',
          step === 'headcount' && 'max-h-none!'
        )}
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
              isScheduleLoading={isScheduleLoading}
              isScheduleError={isScheduleError}
              onRetrySchedule={refetchSchedule}
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
          {/* 예약하기 버튼 */}
          <Button
            theme="primary"
            size="lg"
            className="w-full"
            disabled={primaryButtonDisabled}
            type="button"
            onClick={handlePrimaryButtonClick}
          >
            {primaryButtonLabel}
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
}
