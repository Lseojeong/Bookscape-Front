'use client';

import { useState } from 'react';
import { MinusIcon, PlusIcon } from '@/shared/assets/icons';
import Button from '@/shared/ui/button/Button';
import PerPersonPrice from '@/shared/ui/price/PerPersonPrice';
import PriceDisplay from '@/shared/ui/price/PriceDisplay';
import { cn } from '@/shared/utils/cn';
import ReservationCalendar from './ReservationCalendar';

// TODO: API 연결 후 제거
const MOCK_SCHEDULES = [
  { id: 1, startTime: '14:00', endTime: '15:00' },
  { id: 2, startTime: '15:00', endTime: '16:00' },
];

export default function ReservationWidget() {
  const [selected, setSelected] = useState<Date>();
  const [headCount, setHeadCount] = useState(1);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number>();

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-gray-50 p-6 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
      {/* 가격 */}
      <PerPersonPrice pricePerPerson={1000} />

      {/* 달력 */}
      <ReservationCalendar
        selected={selected}
        onSelect={(date) => {
          setSelected(date);
          setSelectedScheduleId(undefined);
        }}
      />

      {/* 참여 인원 수 */}
      <div className="flex items-center justify-between">
        <p className="typo-16-bold text-gray-950">참여 인원 수</p>
        <div className="flex items-center gap-3 rounded-full border border-gray-50 px-4 py-2">
          <button
            className="flex h-5 w-5 items-center justify-center typo-16-medium text-gray-700"
            onClick={() => setHeadCount((prev) => Math.max(1, prev - 1))}
          >
            <MinusIcon />
          </button>
          <span className="w-10 text-center typo-16-bold text-gray-800">{headCount}</span>
          <button
            className="flex h-5 w-5 items-center justify-center typo-16-medium text-gray-700"
            onClick={() => setHeadCount((prev) => prev + 1)}
          >
            <PlusIcon />
          </button>
        </div>
      </div>

      {/* 예약 가능한 시간 */}
      <div className="border-b border-gray-50 pb-6">
        <p className="mb-3 typo-16-bold text-gray-950">예약 가능한 시간</p>
        {!selected ? (
          <p className="typo-16-medium text-gray-500">날짜를 선택해주세요.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {MOCK_SCHEDULES.map((schedule) => (
              <button
                key={schedule.id}
                onClick={() => setSelectedScheduleId(schedule.id)}
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
      </div>

      {/* 총 합계 + 예약하기 버튼 */}
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <p className="typo-20-medium text-gray-500">총 합계</p>
          <PriceDisplay price={1000 * headCount} unit="" showSlash={false} />
        </div>
        <Button theme="primary" size="md" disabled={!selected || !selectedScheduleId}>
          예약하기
        </Button>
      </div>
    </div>
  );
}
