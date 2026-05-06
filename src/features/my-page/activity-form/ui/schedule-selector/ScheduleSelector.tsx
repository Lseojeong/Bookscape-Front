'use client';

import { ko } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useScheduleSelector } from '@/features/my-page/activity-form/hooks/useScheduleSelector';
import ScheduleCard from '@/features/my-page/activity-form/ui/schedule-selector/ScheduleCard';
import { ReservationStatusIcon } from '@/shared/assets/icons';
import FormField from '@/shared/ui/form/FormField';
import Input from '@/shared/ui/input/Input';
import { cn } from '@/shared/utils/cn';

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
    <div className="flex w-full flex-col">
      <div className={cn('w-full', dateInputError ? 'mb-3' : 'mb-8')}>
        <FormField label="예약 가능한 시간대" errorMessage={scheduleError as string}>
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
                  <style>{`
                  /* 달력 사이즈 (모바일) */
                  #schedule-calendar-wrapper .rdp-root { margin: 0; }
                  #schedule-calendar-wrapper .rdp-caption_label { font-size: 15px; }
                  #schedule-calendar-wrapper table.rdp-month_grid th.rdp-head_cell,
                  #schedule-calendar-wrapper table.rdp-month_grid td.rdp-day,
                  #schedule-calendar-wrapper table.rdp-month_grid td.rdp-day button,
                  #schedule-calendar-wrapper nav.rdp-nav button {
                    width: 32px; height: 32px; min-width: 32px; min-height: 32px;
                    max-width: 32px; max-height: 32px; padding: 0; margin: 0;
                  }
                  #schedule-calendar-wrapper table.rdp-month_grid th.rdp-head_cell {
                    font-size: 12px; padding-bottom: 8px;
                  }
                  #schedule-calendar-wrapper table.rdp-month_grid td.rdp-day,
                  #schedule-calendar-wrapper table.rdp-month_grid td.rdp-day button {
                    font-size: 13px;
                  }

                  /* 꺾쇠 아이콘 색상 변경 */
                  #schedule-calendar-wrapper .rdp-chevron {
                    fill: var(--color-primary-500);
                  }

                  /* 오늘 날짜 텍스트 색상 및 굵기 변경 */
                  #schedule-calendar-wrapper .rdp-today .rdp-day_button {
                    color: var(--color-primary-600);
                    font-weight: 700;
                  }

                  /* 클릭 가능한 날짜 호버 시 배경색 적용 */
                  #schedule-calendar-wrapper .rdp-day:not(.rdp-disabled) .rdp-day_button:hover {
                    background-color: var(--color-primary-100);
                    border-radius: 100%;
                    transition: background-color 0.2s ease;
                  }

                  /* 💡 [수정] 포커스 링을 "달력 내부의 날짜 버튼"에만 둥글게 적용합니다. */
                  #schedule-calendar-wrapper .rdp-day_button:focus-visible {
                    outline: 2px solid var(--color-primary-500);
                    outline-offset: 2px;
                    border-radius: 100%;
                  }

                  /* 💡 [수정] 포커스 링을 "달력 내부의 꺾쇠 버튼"에만 네모낳게 적용합니다. */
                  #schedule-calendar-wrapper nav.rdp-nav button:focus-visible {
                    outline: 2px solid var(--color-primary-500);
                    outline-offset: 2px;
                    border-radius: 6px;
                  }

                  /* 달력 사이즈 (태블릿, 데스크탑) */
                  @media (min-width: 640px) {
                    #schedule-calendar-wrapper .rdp-caption_label { font-size: 18px; }
                    #schedule-calendar-wrapper table.rdp-month_grid th.rdp-head_cell,
                    #schedule-calendar-wrapper table.rdp-month_grid td.rdp-day,
                    #schedule-calendar-wrapper table.rdp-month_grid td.rdp-day button,
                    #schedule-calendar-wrapper nav.rdp-nav button {
                      width: 44px; height: 44px; min-width: 44px; min-height: 44px;
                      max-width: 44px; max-height: 44px;
                    }
                    #schedule-calendar-wrapper table.rdp-month_grid th.rdp-head_cell {
                      font-size: 14px;
                    }
                    #schedule-calendar-wrapper table.rdp-month_grid td.rdp-day,
                    #schedule-calendar-wrapper table.rdp-month_grid td.rdp-day button {
                      font-size: 15px;
                    }
                  }
                `}</style>

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
    </div>
  );
}
