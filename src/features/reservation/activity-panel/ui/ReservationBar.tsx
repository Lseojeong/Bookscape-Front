'use client';

import { useRef, useState } from 'react';
import { useReservation } from '@/features/reservation/activity-panel/hooks/useReservation';
import HeadcountStep from '@/features/reservation/activity-panel/ui/HeadcountStep';
import ScheduleStep from '@/features/reservation/activity-panel/ui/ScheduleStep';
import { ChevronRightIcon } from '@/shared/assets/icons';
import Button from '@/shared/ui/button/Button';
import OverlayLayer from '@/shared/ui/overlay/layer/OverlayLayer';
import TotalPrice from '@/shared/ui/price/TotalPrice';
import { cn } from '@/shared/utils/cn';

type ReservationBarProps = {
  activityId: number;
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
 * <ReservationBar activityId={activityId} />
 * ```
 */
export default function ReservationBar({ activityId }: ReservationBarProps) {
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
  } = useReservation(activityId);

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'schedule' | 'headcount'>('schedule');

  const startYRef = useRef<number>(0);
  const [dragY, setDragY] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const diff = e.touches[0].clientY - startYRef.current;
    if (diff > 0) setDragY(diff); // 아래로만 이동
  };

  const handleTouchEnd = () => {
    if (dragY > 100) {
      setIsOpen(false);
    }
    setDragY(0); // 원위치
  };

  const handleClose = () => {
    setIsOpen(false);
    setStep('schedule');
    reset();
  };

  return (
    <div className="fixed right-0 bottom-0 left-0 layer-header lg:hidden">
      <div className="flex flex-col gap-2 border-t border-gray-100 bg-white px-4 py-3">
        <TotalPrice totalPrice={price} headCount={1} />
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
      <OverlayLayer
        isOpen={isOpen}
        onClose={handleClose}
        position="bottom"
        variant="sheet"
        ariaLabel="예약 날짜 선택"
        surfaceClassName={step === 'headcount' ? 'h-auto!' : undefined}
        contentClassName={cn('rounded-t-3xl! rounded-b-none!', step === 'schedule' && 'h-full')}
        surfaceStyle={{
          transform: `translateY(${dragY}px)`,
          transition: dragY === 0 ? 'transform 0.3s ease' : 'none',
        }}
      >
        <div className="flex h-full flex-col">
          {/* 핸들바 */}
          <div
            className="flex justify-center pt-1 pb-3"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="h-1 w-19 rounded-full bg-gray-300" />
          </div>
          {/* 콘텐츠 */}
          <div className="flex-1 overflow-y-auto px-6">
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
                onSelectSchedule={(id) => setSelectedScheduleId(id)}
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

          <div className="relative">
            {/* 인원 수 선택 버튼 — 모바일에서만 표시 */}
            {step === 'schedule' && (
              <button
                className="absolute -top-9 right-2 flex items-center gap-1 md:hidden"
                disabled={!selectedScheduleId}
                onClick={() => setStep('headcount')}
              >
                <span className="typo-16-medium text-gray-500">인원 수 선택</span>
                <ChevronRightIcon className="text-gray-500" />
              </button>
            )}
            {/* 예약하기 버튼 */}
            <Button
              theme="primary"
              size="lg"
              className="w-full"
              disabled={!selected || !selectedScheduleId}
              onClick={handleReserve}
            >
              예약하기
            </Button>
          </div>
        </div>
      </OverlayLayer>
    </div>
  );
}
