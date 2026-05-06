'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import type { CalendarSchedule } from '@/features/my-page/reservation-status/types/reservation';
import ReservationBadge from '@/features/my-page/reservation-status/ui/ReservationBadge';
import { CaretLeftIcon, CaretRightIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

type ReservationCalendarProps = {
  month: Date;
  onMonthChange: (month: Date) => void;
  schedules: CalendarSchedule[];
  onDateClick?: (date: Date) => void;
};
/**
 * 월별 예약 현황을 캘린더 형태로 표시하는 컴포넌트.
 *
 * - 각 날짜 셀에 완료 / 예약(pending) / 승인(confirmed) 건수를 뱃지로 표시합니다.
 * - 예약이 하나라도 있는 날짜는 날짜 숫자 옆에 빨간 점으로 표시됩니다.
 * - 달력 바깥 날짜(이전/다음 달)는 클릭 및 예약 뱃지 표시가 비활성화됩니다.
 * - `react-day-picker`의 `Day` 컴포넌트를 커스텀하여 예약 현황을 인라인으로 렌더링합니다.
 *
 * @example
 * ```tsx
 * <ReservationCalendar
 *   month={month}
 *   onMonthChange={setMonth}
 *   schedules={calendarSchedules}
 *   onDateClick={handleDateClick}
 * />
 * ```
 */
export default function ReservationCalendar({
  month,
  onMonthChange,
  schedules,
  onDateClick,
}: ReservationCalendarProps) {
  return (
    <div className="-mx-6 w-screen bg-white md:mx-0 md:w-full md:rounded-2xl md:pt-5 md:shadow-card">
      <DayPicker
        locale={ko}
        month={month}
        onMonthChange={onMonthChange}
        showOutsideDays
        classNames={{
          root: 'w-full relative',
          months: 'w-full',
          nav: 'absolute inset-x-0 flex justify-center gap-25 md:gap-40 layer-base',
          month_caption: 'flex justify-center items-center relative mb-7.5',
          caption_label: 'typo-16-bold md:typo-20-bold',
          button_previous: 'cursor-pointer',
          button_next: 'cursor-pointer',
          month_grid: 'w-full',
          weekdays: 'grid grid-cols-7',
          weekday: 'text-center typo-16-bold pb-3 border-b border-gray-100',
          week: 'grid grid-cols-7',
          weeks: '[&>*:last-child>*]:border-b-0',
          outside: 'text-gray-300',
          today: 'bg-blue-50',
        }}
        components={{
          Chevron: ({ orientation }) =>
            orientation === 'left' ? (
              <CaretLeftIcon className="h-5 w-5 md:h-6 md:w-6" />
            ) : (
              <CaretRightIcon className="h-5 w-5 md:h-6 md:w-6" />
            ),
          Day: ({ day, modifiers, ...props }) => {
            const isToday = modifiers.today;
            const isOutside = day.outside;
            const dateStr = format(day.date, 'yyyy-MM-dd');
            const schedule = schedules.find((s) => s.date === dateStr);
            const hasReservation =
              schedule &&
              (schedule.reservations.completed > 0 ||
                schedule.reservations.confirmed > 0 ||
                schedule.reservations.pending > 0);

            const handleClick = () => {
              if (!isOutside && onDateClick) {
                onDateClick(day.date);
              }
            };

            return (
              <td
                {...props}
                onClick={handleClick}
                className={cn(
                  'flex h-full min-h-31 w-full flex-col items-center gap-1 border-b border-gray-50 p-1 px-3 py-4.5 typo-16-medium',
                  isToday && 'bg-blue-50',
                  !isOutside && 'cursor-pointer hover:bg-gray-25'
                )}
              >
                <span className={cn(isOutside ? 'text-gray-300' : 'text-gray-800', 'relative')}>
                  {day.date.getDate()}
                  {hasReservation && !isOutside && (
                    <span className="absolute -top-1.25 -right-1 h-1.5 w-1.5 rounded-full bg-red-500" />
                  )}
                </span>
                {schedule && !isOutside && (
                  <div className="flex w-full flex-col gap-1 text-center">
                    <ReservationBadge type="completed" count={schedule.reservations.completed} />
                    <ReservationBadge type="pending" count={schedule.reservations.pending} />
                    <ReservationBadge type="confirmed" count={schedule.reservations.confirmed} />
                  </div>
                )}
              </td>
            );
          },
        }}
      />
    </div>
  );
}
