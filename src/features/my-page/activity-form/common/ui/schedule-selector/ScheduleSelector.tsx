'use client';

import '@/features/my-page/activity-form/common/ui/schedule-selector/schedule-calendar.css';
import { ko } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useScheduleSelector } from '@/features/my-page/activity-form/common/hooks/useScheduleSelector';
import ScheduleCard from '@/features/my-page/activity-form/common/ui/schedule-selector/ScheduleCard';
import { ReservationStatusIcon } from '@/shared/assets/icons';
import FormField from '@/shared/ui/form/FormField';
import Input from '@/shared/ui/input/Input';

/**
 * 예약 가능한 날짜를 달력에서 선택하고, 선택된 날짜들의 스케줄 카드 목록을 렌더링하는 부모 컴포넌트입니다.
 *
 * @example
 * <ScheduleSelector />
 */
export default function ScheduleSelector() {
  const {
    calendarRef,
    isCalendarOpen,
    setIsCalendarOpen,
    groupedSchedules,
    dateInputError,
    scheduleError,
    handleSelectDate,
    handleRemoveGroup,
    handleAddSlot,
    handleRemoveSlot,
  } = useScheduleSelector();

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="w-full">
        <FormField
          label="예약 가능한 시간대"
          labelWeight="bold"
          errorMessage={scheduleError as string}
        >
          <FormField label="날짜" errorMessage={dateInputError}>
            <div className="relative w-full" ref={calendarRef} id="schedule-calendar-wrapper">
              <Input
                placeholder="yy/mm/dd"
                readOnly
                isError={!!dateInputError}
                onMouseDown={(e) => e.preventDefault()}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setIsCalendarOpen((prev) => !prev)}
                    onMouseDown={(e) => e.preventDefault()}
                    className="flex items-center justify-center rounded-md p-1 transition-colors hover:bg-primary-100 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
                    aria-label="달력 열기"
                  >
                    <ReservationStatusIcon className="h-6 w-6 text-black" />
                  </button>
                }
              />

              {isCalendarOpen && (
                <div className="absolute top-[110%] right-0 z-50 w-max rounded-2xl border border-gray-100 bg-white p-3 shadow-lg sm:p-4">
                  <DayPicker
                    mode="single"
                    locale={ko}
                    onSelect={handleSelectDate}
                    disabled={[{ before: new Date() }]}
                  />
                </div>
              )}
            </div>
          </FormField>
        </FormField>
      </div>

      {/* 등록된 그룹 스케줄 카드 렌더링 영역 */}
      {groupedSchedules.length > 0 && (
        <div className="flex flex-col gap-5">
          {groupedSchedules.map((group, index) => (
            <ScheduleCard
              key={group.dateString}
              date={group.date}
              slots={group.slots}
              onRemoveCard={() => handleRemoveGroup(group.dateString)}
              onAddSlot={(newSlot) => handleAddSlot(index, newSlot)}
              onRemoveSlot={(slotIndex) => handleRemoveSlot(index, slotIndex)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
