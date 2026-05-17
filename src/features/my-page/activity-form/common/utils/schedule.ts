import { format } from 'date-fns';
import { Slot } from '@/features/my-page/activity-form/types';

/**
 * 선택된 날짜에 따라 예약 가능한 시작 시간 목록을 필터링합니다.
 * 당일일 경우 현재 시간 이하의 슬롯은 제외하여 미래의 시간만 반환합니다.
 *
 * @param date 선택된 달력 날짜
 * @param allTimes 전체 시작 시간 배열
 */
export const getAvailableStartTimes = (date: Date, allTimes: string[]): string[] => {
  const now = new Date();
  const isToday = format(date, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd');
  const currentHour = now.getHours();

  return allTimes.filter((time) => {
    if (!isToday) return true;
    const [hour] = time.split(':').map(Number);
    return hour > currentHour;
  });
};

/** 24시간 초과 여부 확인 */
export const isExceedingMidnight = (start: string, duration: number): boolean => {
  const [hour, minute] = start.split(':').map(Number);
  const endHour = hour + duration;
  return endHour > 24 || (endHour === 24 && minute > 0);
};

/** 시작 시간과 진행 시간을 더해 종료 시간 계산 */
export const calculateEndTime = (start: string, duration: number): string => {
  const [hour, min] = start.split(':').map(Number);
  const endHour = hour + duration;
  return `${String(endHour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
};

/** 기존 슬롯들과 비교하여 겹치는 시간대가 있는지 확인 */
export const findOverlapSlot = (
  slots: Slot[],
  newStart: string,
  newEnd: string
): Slot | undefined => {
  return slots.find((slot) => newStart < slot.endTime && newEnd > slot.startTime);
};
