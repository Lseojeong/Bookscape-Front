import { Slot } from '@/features/my-page/activity-form/types';

/** 24시간 초과 여부 확인 */
export const isExceedingMidnight = (start: string, duration: number): boolean => {
  const [hour, minute] = start.split(':').map(Number);
  const endHour = hour + duration;
  return endHour > 24 || (endHour === 24 && minute > 0);
};

/**
 * 시작 시간과 진행 시간을 더해 종료 시간 계산
 * (24:00 익일 파싱 버그 방지를 위해 24:00인 경우 23:59로 반환)
 * @example calculateEndTime('09:00', 2) // '11:00'
 */
export const calculateEndTime = (start: string, duration: number): string => {
  const [hour, min] = start.split(':').map(Number);

  const totalMinutes = hour * 60 + min + duration * 60;

  const endHour = Math.floor(totalMinutes / 60);
  const endMin = totalMinutes % 60;

  // 24:00인 경우에만 23:59로 예외 처리
  if (endHour === 24 && endMin === 0) {
    return '23:59';
  }

  return `${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`;
};

/** 기존 슬롯들과 비교하여 겹치는 시간대가 있는지 확인 */
export const findOverlapSlot = (
  slots: Slot[],
  newStart: string,
  newEnd: string
): Slot | undefined => {
  return slots.find((slot) => newStart < slot.endTime && newEnd > slot.startTime);
};
