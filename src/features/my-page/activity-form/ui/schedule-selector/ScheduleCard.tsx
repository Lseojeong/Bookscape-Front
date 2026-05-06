'use client';

import { format } from 'date-fns';
import { DURATIONS, START_TIMES } from '@/features/my-page/activity-form/constants/schedule';
import { useScheduleCard } from '@/features/my-page/activity-form/hooks/useScheduleCard';
import { Slot } from '@/features/my-page/activity-form/types';
import TimeSlotChip from '@/features/my-page/activity-form/ui/schedule-selector/TimeSlotChip';
import { CaretDownIcon, TrashIcon } from '@/shared/assets/icons';
import {
  SelectDropdown,
  SelectDropdownContent,
  SelectDropdownItem,
  SelectDropdownTrigger,
  SelectDropdownValue,
} from '@/shared/ui/dropdown/select';
import FormField from '@/shared/ui/form/FormField';
import { cn } from '@/shared/utils/cn';

type ScheduleCardProps = {
  date: Date;
  dateString: string;
  slots: Slot[];
  onRemoveCard: () => void;
  onAddSlot: (slot: Slot) => void;
  onRemoveSlot: (slotIndex: number) => void;
};

export default function ScheduleCard({
  date,
  dateString,
  slots,
  onRemoveCard,
  onAddSlot,
  onRemoveSlot,
}: ScheduleCardProps) {
  const {
    tempStartTime,
    tempDuration,
    isExpanded,
    setIsExpanded,
    overlapError,
    handleStartTimeChange,
    handleDurationChange,
  } = useScheduleCard({ dateString, slots, onAddSlot });

  return (
    <div className="flex w-full flex-col rounded-2xl border border-gray-100 bg-white">
      <div
        className={cn(
          'flex cursor-pointer items-center justify-between px-5 py-4 transition-colors hover:bg-primary-50',
          isExpanded ? 'rounded-t-2xl border-b border-gray-100' : 'rounded-2xl'
        )}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <div className="flex items-center gap-1">
          <CaretDownIcon
            className={`h-6 w-6 text-gray-950 transition-transform duration-200 ${!isExpanded ? '-rotate-90' : ''}`}
          />
          <h4 className="typo-16-bold text-black">{format(date, 'yyyy년 MM월 dd일')}</h4>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemoveCard();
          }}
          className="rounded-md p-1 transition-colors hover:bg-primary-100 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
          aria-label="해당 날짜 카드 삭제"
        >
          <TrashIcon className="h-5 w-5 text-black" />
        </button>
      </div>

      {isExpanded && (
        <div className="flex flex-col px-4 py-6.25 md:px-5.5 lg:px-5 lg:py-7">
          <div className="mb-7.25 lg:mb-6.5">
            <FormField label="시작 시간">
              <SelectDropdown value={tempStartTime} onChangeValue={handleStartTimeChange}>
                <SelectDropdownTrigger isError={!!overlapError}>
                  <SelectDropdownValue placeholder="시작 시간" />
                </SelectDropdownTrigger>
                <SelectDropdownContent>
                  {START_TIMES.map((time) => (
                    <SelectDropdownItem key={time} value={time}>
                      {time}
                    </SelectDropdownItem>
                  ))}
                </SelectDropdownContent>
              </SelectDropdown>
            </FormField>
          </div>

          <div className={cn('w-full', overlapError ? 'mb-2 lg:mb-1.5' : 'mb-7.25 lg:mb-6.5')}>
            <FormField label="체험 시간" errorMessage={overlapError}>
              <SelectDropdown<number | ''>
                value={tempDuration}
                onChangeValue={handleDurationChange}
              >
                <SelectDropdownTrigger isError={!!overlapError}>
                  <SelectDropdownValue placeholder="시간 선택" render={(v) => `${v}시간`} />
                </SelectDropdownTrigger>
                <SelectDropdownContent>
                  {DURATIONS.map((dur) => (
                    <SelectDropdownItem key={dur} value={dur}>
                      {dur}시간
                    </SelectDropdownItem>
                  ))}
                </SelectDropdownContent>
              </SelectDropdown>
            </FormField>
          </div>

          {/* 등록된 시간대가 있을 때만 렌더링 */}
          {slots.length > 0 && (
            <div className="pt-2">
              <FormField label="등록된 시간대">
                <div className="flex flex-wrap gap-3">
                  {slots.map((slot, index) => (
                    <TimeSlotChip
                      key={`${slot.startTime}-${slot.endTime}`}
                      onRemove={() => onRemoveSlot(index)}
                    >
                      {slot.startTime} ~ {slot.endTime}
                    </TimeSlotChip>
                  ))}
                </div>
              </FormField>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
