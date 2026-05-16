'use client';

import { format } from 'date-fns';
import { useState } from 'react';
import { DURATIONS, START_TIMES } from '@/features/my-page/activity-form/common/constants/schedule';
import { useScheduleCard } from '@/features/my-page/activity-form/common/hooks/useScheduleCard';
import TimeSlotChip from '@/features/my-page/activity-form/common/ui/schedule-selector/TimeSlotChip';
import { Slot } from '@/features/my-page/activity-form/types';
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
  slots: Slot[];
  onRemoveCard: () => void;
  onAddSlot: (slot: Slot) => void;
  onRemoveSlot: (slotIndex: number) => void;
};

/**
 * 특정 날짜의 스케줄 정보를 아코디언 형태로 관리하고 렌더링하는 UI 컴포넌트입니다.
 * 시작 시간과 체험 시간을 선택하여 새로운 시간대를 추가하거나, 기존 시간대 및 카드 전체를 삭제할 수 있습니다.
 *
 * @example
 * <ScheduleCard
 *   date={new Date()}
 *   slots={[{ startTime: '09:00', endTime: '11:00' }]}
 *   onRemoveCard={() => handleRemoveGroup('2026-05-12')}
 *   onAddSlot={(newSlot) => handleAddSlot(index, newSlot)}
 *   onRemoveSlot={(slotIndex) => handleRemoveSlot(index, slotIndex)}
 * />
 */
export default function ScheduleCard({
  date,
  slots,
  onRemoveCard,
  onAddSlot,
  onRemoveSlot,
}: ScheduleCardProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const { tempStartTime, tempDuration, overlapError, handleStartTimeChange, handleDurationChange } =
    useScheduleCard({ slots, onAddSlot });

  return (
    <div className="flex w-full flex-col rounded-2xl border border-gray-100 bg-white">
      <div
        onClick={() => setIsExpanded((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsExpanded((prev) => !prev);
          }
        }}
        className={cn(
          'flex w-full items-center justify-between px-5 py-4 transition-colors hover:bg-primary-50 focus-visible:outline-none',
          isExpanded ? 'rounded-t-2xl border-b border-gray-100' : 'rounded-2xl'
        )}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? '상세 정보 닫기' : '상세 정보 열기'}
        tabIndex={0}
      >
        <div className="flex items-center gap-1">
          <CaretDownIcon
            className={cn(
              'h-6 w-6 shrink-0 text-gray-950 transition-transform duration-200',
              !isExpanded && '-translate-y-1 -rotate-90'
            )}
          />
          <h4 className="typo-16-bold text-black">{format(date, 'yyyy년 MM월 dd일')}</h4>
        </div>

        <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={onRemoveCard}
            className="rounded-md p-1 transition-colors hover:bg-primary-100 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
            aria-label="해당 날짜 카드 삭제"
          >
            <TrashIcon className="h-5 w-5 text-black" />
          </button>
        </div>
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
