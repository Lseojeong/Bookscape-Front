import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ACTIVITY_ERROR_MESSAGES } from '@/features/my-page/activity-form/constants/validation';
import { ScheduleGroup, Slot } from '@/features/my-page/activity-form/types';

type ScheduleFieldError = {
  root?: { message?: string };
  message?: string;
};

/**
 * 예약 가능한 시간대 달력 선택 및 날짜별 시간대 상태를 관리하는 커스텀 훅입니다.
 *
 * @example
 * const {
 *   groupedSchedules,
 *   handleSelectDate,
 *   handleAddSlot
 * } = useScheduleSelector();
 */
export const useScheduleSelector = () => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [groupedSchedules, setGroupedSchedules] = useState<ScheduleGroup[]>([]);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [dateInputError, setDateInputError] = useState<string>('');

  // 달력 외부 영역 클릭 시 달력 닫기
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // 로컬 상태를 RHF 상태로 동기화
  useEffect(() => {
    const flatSchedules = groupedSchedules.flatMap((group) =>
      group.slots.map((slot) => ({
        date: group.dateString,
        startTime: slot.startTime,
        endTime: slot.endTime,
      }))
    );
    setValue('schedules', flatSchedules, { shouldValidate: true, shouldDirty: true });
  }, [groupedSchedules, setValue]);

  // 달력에서 특정 날짜를 선택했을 때의 처리
  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return;
    const dateString = format(date, 'yyyy-MM-dd');

    // 이미 추가된 날짜인지 중복 검사
    if (groupedSchedules.some((g) => g.dateString === dateString)) {
      setDateInputError(ACTIVITY_ERROR_MESSAGES.DATE_ALREADY_ADDED);
      setIsCalendarOpen(false);
      return;
    }

    // 중복이 아니라면 에러를 지우고 새로운 날짜 그룹을 추가
    setDateInputError('');
    setGroupedSchedules((prev) => [...prev, { date, dateString, slots: [] }]);
    setIsCalendarOpen(false);
  };

  // 등록된 특정 날짜 그룹 카드 전체를 삭제
  const handleRemoveGroup = (dateString: string) => {
    setGroupedSchedules((prev) => prev.filter((g) => g.dateString !== dateString));
  };

  // 특정 날짜 그룹 카드 안에 새로운 시간대 추가
  const handleAddSlot = (groupIndex: number, newSlot: Slot) => {
    setGroupedSchedules((prev) =>
      prev.map((group, index) => {
        if (index === groupIndex) {
          const updatedSlots = [...group.slots, newSlot].sort((a, b) =>
            a.startTime.localeCompare(b.startTime)
          );
          return { ...group, slots: updatedSlots };
        }
        return group;
      })
    );
  };

  // 특정 날짜 그룹 카드 안의 특정 시간대 삭제
  const handleRemoveSlot = (groupIndex: number, slotIndex: number) => {
    setGroupedSchedules((prev) =>
      prev.map((group, index) => {
        if (index === groupIndex) {
          const updatedSlots = group.slots.filter((_, sIndex) => sIndex !== slotIndex);
          return { ...group, slots: updatedSlots };
        }
        return group;
      })
    );
  };

  // 유효성 검사에 걸린 폼 에러 메시지 추출
  const schedulesErrorObj = errors.schedules as ScheduleFieldError | undefined;
  const scheduleError = schedulesErrorObj?.root?.message || schedulesErrorObj?.message;

  return {
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
  };
};
