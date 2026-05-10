'use client';

import { ko } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import { CaretLeftIcon, CaretRightIcon } from '@/shared/assets/icons';

type ReservationCalendarProps = {
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
  month: Date;
  onMonthChange: (month: Date) => void;
};

/**
 * 예약 날짜 선택 달력 컴포넌트입니다.
 *
 * ReservationWidget(PC)과 ReservationBar(모바일/태블릿)에서 공통으로 사용합니다.
 *
 * @example
 * ```tsx
 * <ReservationCalendar selected={selected} onSelect={setSelected} />
 * ```
 */
export default function ReservationCalendar({
  selected,
  onSelect,
  month,
  onMonthChange,
}: ReservationCalendarProps) {
  return (
    <div>
      <p className="mb-2 typo-18-bold text-gray-950 md:mb-6 lg:mb-2">날짜</p>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={(date) => {
          onSelect(date);
          if (date) onMonthChange(date);
        }}
        month={month}
        onMonthChange={onMonthChange}
        locale={ko}
        showOutsideDays
        components={{
          Chevron: ({ orientation }) =>
            orientation === 'left' ? (
              <CaretLeftIcon className="h-6 w-6" />
            ) : (
              <CaretRightIcon className="h-6 w-6" />
            ),
        }}
        classNames={{
          root: 'w-87.5 mx-auto', // 달력 전체 감싸는 최상의 div
          months: 'w-full relative', // 월 전체 영역
          month_grid: 'w-full', // 날짜 그리드 테이블
          month_caption: 'flex items-center mb-2', // "2026년 5월 ◀ ▶" 헤더 영역 전체
          caption_label: 'typo-16-medium text-gray-950', // "2026년 5월" 텍스트
          nav: 'absolute right-0 top-0 flex gap-3', // ◀ ▶ 버튼 묶음
          button_previous: 'flex items-center justify-center', // ◀ 이전 버튼
          button_next: 'flex items-center justify-center', // ▶ 다음 버튼
          weekdays: 'grid grid-cols-7 mb-2', // "일 월 화 수 목 금 토" 행 전체
          weekday: 'aspect-square flex items-center justify-center typo-16-bold text-gray-800', // 요일 각각
          weeks: 'flex flex-col gap-1 md:min-h-80', // 날짜 행들 전체
          week: 'grid grid-cols-7', // 한 주 행
          day: 'flex items-center justify-center aspect-square', // 날짜 셀 wrapper
          // 날짜 숫자 버튼
          day_button:
            'w-full h-full flex items-center justify-center rounded-full hover:bg-primary-100 transition-colors',
          today: 'bg-primary-100 rounded-full text-primary-500', // 오늘 날짜
          selected: 'bg-primary-500 rounded-full text-white pointer-events-none', // 선택된 날짜
          outside: 'text-gray-300', // 이전/다음 달 날짜 (흐리게)
          disabled: 'text-gray-300 cursor-not-allowed', // 비활성화된 날짜
        }}
      />
    </div>
  );
}
