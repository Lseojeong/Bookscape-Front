import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ACTIVITY_ERROR_MESSAGES } from '@/features/my-page/activity-form/constants/validation';
import { ScheduleGroup, Slot } from '@/features/my-page/activity-form/types';
import useOutsideClick from '@/shared/hooks/useOutsideClick';

type ScheduleFieldError = {
  root?: { message?: string };
  message?: string;
};

type RHFScheduleItem = {
  date: string;
  startTime: string;
  endTime: string;
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
    getValues,
    formState: { errors, submitCount },
  } = useFormContext();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [dateInputError, setDateInputError] = useState<{ message: string; count: number } | null>(
    null
  );

  // 초기 상태 설정
  const [groupedSchedules, setGroupedSchedules] = useState<ScheduleGroup[]>(() => {
    const initialSchedules = getValues('schedules') as RHFScheduleItem[] | undefined;

    if (!initialSchedules || initialSchedules.length === 0) {
      return [];
    }

    const groups: Record<string, ScheduleGroup> = {};
    initialSchedules.forEach((s) => {
      if (!groups[s.date]) {
        groups[s.date] = {
          date: new Date(s.date),
          dateString: s.date,
          slots: [],
        };
      }
      groups[s.date].slots.push({ startTime: s.startTime, endTime: s.endTime });
    });

    return Object.values(groups);
  });

  // 달력 외부 영역 클릭 시 달력 닫기
  useOutsideClick(calendarRef, () => setIsCalendarOpen(false), isCalendarOpen);

  // 전역에서 esc키 감지해서 달력 닫기
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCalendarOpen) {
        setIsCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener('keydown', handleGlobalKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [isCalendarOpen]);

  // 로컬 상태를 RHF 상태로 동기화
  useEffect(() => {
    const flatSchedules = groupedSchedules.flatMap((group) =>
      group.slots.map((slot) => ({
        date: group.dateString,
        startTime: slot.startTime,
        endTime: slot.endTime,
      }))
    );

    // 폼 제출을 한 번이라도 시도했다면, 그 이후부터는 로컬 상태 동기화 시 즉각 유효성 검사
    const shouldValidate = submitCount > 0;

    setValue('schedules', flatSchedules, {
      shouldValidate,
      shouldDirty: true,
    });
  }, [groupedSchedules, setValue, submitCount]);

  // 달력에서 특정 날짜를 선택했을 때의 처리
  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return;
    const dateString = format(date, 'yyyy-MM-dd');

    // 이미 추가된 날짜인지 중복 검사
    if (groupedSchedules.some((g) => g.dateString === dateString)) {
      // 에러를 띄울 때 현재의 submitCount를 달아줌
      setDateInputError({
        message: ACTIVITY_ERROR_MESSAGES.DATE_ALREADY_ADDED,
        count: submitCount,
      });
      setIsCalendarOpen(false);
      return;
    }

    // 중복이 아니라면 에러를 지우고 새로운 날짜 그룹을 추가
    setDateInputError(null);
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

  // 렌더링 단계에서 보여줄 에러 판별 (제출 버튼을 눌러 count가 달라지면 빈 문자열 반환)
  const displayDateError =
    dateInputError && dateInputError.count === submitCount ? dateInputError.message : '';

  return {
    calendarRef,
    isCalendarOpen,
    setIsCalendarOpen,
    groupedSchedules,
    dateInputError: displayDateError, // 계산된 에러 문자열 내보내기
    scheduleError,
    handleSelectDate,
    handleRemoveGroup,
    handleAddSlot,
    handleRemoveSlot,
  };
};
