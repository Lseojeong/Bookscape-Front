import { format } from 'date-fns';
import { useEffect, useMemo, useRef, useState } from 'react';
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
    watch,
    formState: { errors, submitCount },
  } = useFormContext();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [dateInputError, setDateInputError] = useState<{ message: string; count: number } | null>(
    null
  );

  // 슬롯이 아직 없는 "빈 날짜"들만 로컬 상태로 관리
  const [emptyDates, setEmptyDates] = useState<string[]>([]);

  // RHF의 실제 폼 데이터를 실시간으로 구독
  const formSchedules = watch('schedules') as RHFScheduleItem[] | undefined;

  // RHF의 폼 데이터와 유저가 클릭한 빈 날짜를 합쳐서 화면에 그릴 데이터를 계산
  const groupedSchedules = useMemo(() => {
    const groups: Record<string, ScheduleGroup> = {};

    // RHF에 저장된 슬롯이 있는 날짜들을 그룹화
    if (formSchedules) {
      formSchedules.forEach((s) => {
        if (!groups[s.date]) {
          groups[s.date] = { date: new Date(s.date), dateString: s.date, slots: [] };
        }
        groups[s.date].slots.push({ startTime: s.startTime, endTime: s.endTime });
      });
    }

    // 사용자가 달력에서 추가했지만 아직 시간을 등록하지 않은 빈 날짜들을 합침
    emptyDates.forEach((dateString) => {
      if (!groups[dateString]) {
        groups[dateString] = { date: new Date(dateString), dateString, slots: [] };
      }
    });

    // 날짜순 정렬 및 각 날짜 내부의 시간순 정렬을 수행하여 반환
    return Object.values(groups)
      .sort((a, b) => a.dateString.localeCompare(b.dateString))
      .map((group) => {
        group.slots.sort((a, b) => a.startTime.localeCompare(b.startTime));
        return group;
      });
  }, [formSchedules, emptyDates]);

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
    // 슬롯이 없는 초기 상태이므로 emptyDates에만 추가
    setEmptyDates((prev) => [...prev, dateString]);
    setIsCalendarOpen(false);
  };

  // 등록된 특정 날짜 그룹 카드 전체를 삭제
  const handleRemoveGroup = (dateString: string) => {
    setEmptyDates((prev) => prev.filter((d) => d !== dateString)); // 빈 날짜 목록에서 우선 제거

    const currentSchedules = (getValues('schedules') as RHFScheduleItem[]) || [];
    const newSchedules = currentSchedules.filter((s) => s.date !== dateString); // RHF 원본에서 제거

    setValue('schedules', newSchedules, { shouldValidate: submitCount > 0, shouldDirty: true });
  };

  const handleAddSlot = (groupIndex: number, newSlot: Slot) => {
    const targetDateString = groupedSchedules[groupIndex].dateString;
    const currentSchedules = (getValues('schedules') as RHFScheduleItem[]) || [];

    const newSchedules = [
      ...currentSchedules,
      { date: targetDateString, startTime: newSlot.startTime, endTime: newSlot.endTime },
    ];

    setValue('schedules', newSchedules, { shouldValidate: submitCount > 0, shouldDirty: true });
  };

  const handleRemoveSlot = (groupIndex: number, slotIndex: number) => {
    const targetDateString = groupedSchedules[groupIndex].dateString;
    const targetSlot = groupedSchedules[groupIndex].slots[slotIndex];

    const currentSchedules = (getValues('schedules') as RHFScheduleItem[]) || [];

    // 삭제하려는 시간대와 완전히 일치하는 항목만 필터링하여 제거
    const newSchedules = currentSchedules.filter(
      (s) =>
        !(
          s.date === targetDateString &&
          s.startTime === targetSlot.startTime &&
          s.endTime === targetSlot.endTime
        )
    );

    setValue('schedules', newSchedules, { shouldValidate: submitCount > 0, shouldDirty: true });
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
