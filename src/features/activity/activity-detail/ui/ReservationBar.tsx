'use client';

import { useState } from 'react';
import Button from '@/shared/ui/button/Button';
import OverlayLayer from '@/shared/ui/overlay/layer/OverlayLayer';
import TotalPrice from '@/shared/ui/price/TotalPrice';
import ReservationCalendar from './ReservationCalendar';

export default function ReservationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Date>();

  return (
    <>
      <div className="flex flex-col gap-2 bg-white px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <TotalPrice totalPrice={1000} headCount={1} />
        <Button theme="primary" size="md" className="w-full" onClick={() => setIsOpen(true)}>
          예약하기
        </Button>
      </div>
      <OverlayLayer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="bottom"
        variant="sheet"
        ariaLabel="예약 날짜 선택"
        contentClassName="!rounded-t-3xl !rounded-b-none h-full"
      >
        <div className="flex h-full flex-col">
          {/* 핸들바 */}
          <div className="flex justify-center pt-1 pb-3">
            <div className="h-1 w-19 rounded-full bg-gray-300" />
          </div>
          {/* 콘텐츠 */}
          <div className="flex-1 overflow-y-auto px-6 md:flex md:justify-center md:gap-6 md:py-6">
            {/* 달력 */}
            <div>
              <ReservationCalendar selected={selected} onSelect={setSelected} />
            </div>
            {/* 예약 가능한 시간 */}
            <div className="mt-6 md:w-75 md:rounded-2xl md:p-6 md:shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
              <p className="mb-3 typo-16-bold text-gray-950">예약 가능한 시간</p>
              <div className="mb-8 flex items-center justify-center">
                <p className="typo-16-medium text-gray-500">날짜를 선택해주세요.</p>
              </div>
            </div>
          </div>
          {/* 예약하기 버튼 */}
          <Button theme="primary" size="lg" className="w-full">
            예약하기
          </Button>
        </div>
      </OverlayLayer>
    </>
  );
}
