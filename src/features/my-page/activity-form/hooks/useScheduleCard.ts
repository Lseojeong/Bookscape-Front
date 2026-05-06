import { useEffect, useState } from 'react';
import { ACTIVITY_ERROR_MESSAGES } from '@/features/my-page/activity-form/constants/validation';
import { Slot } from '@/features/my-page/activity-form/types';
import {
  calculateEndTime,
  findOverlapSlot,
  isExceedingMidnight,
} from '@/features/my-page/activity-form/utils/schedule';

type UseScheduleCardProps = {
  dateString: string;
  slots: Slot[];
  onAddSlot: (slot: Slot) => void;
};

/**
 * 개별 스케줄 카드의 입력 상태를 관리하고, 새로운 시간대 추가 시 유효성을 검증하는 훅입니다.
 * 시작 시간과 체험 시간을 조합하여 24시간 초과 여부 및 기존 스케줄과의 중복 여부를 판별합니다.
 *
 * @example
 * const {
 *   tempStartTime,
 *   tempDuration,
 *   overlapError,
 *   handleStartTimeChange
 * } = useScheduleCard({
 *   dateString: '2026-05-12',
 *   slots: currentSlots,
 *   onAddSlot: (newSlot) => appendSlot(newSlot)
 * });
 */
export const useScheduleCard = ({ slots, onAddSlot }: UseScheduleCardProps) => {
  const [tempStartTime, setTempStartTime] = useState<string>('');
  const [tempDuration, setTempDuration] = useState<number | ''>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [overlapError, setOverlapError] = useState<string>('');

  // 시작 시간과 체험 시간이 모두 입력되었을 때 유효성을 검증하고, 통과 시 상태 초기화
  const handleAttemptAddSlot = (start: string, duration: number | '') => {
    if (!start || !duration) return;

    if (isExceedingMidnight(start, Number(duration))) {
      setOverlapError(ACTIVITY_ERROR_MESSAGES.TIME_EXCEEDS_MIDNIGHT);
      return;
    }

    const endTime = calculateEndTime(start, Number(duration));
    const overlapSlot = findOverlapSlot(slots, start, endTime);

    if (overlapSlot) {
      const overlapStart = start > overlapSlot.startTime ? start : overlapSlot.startTime;
      const overlapEnd = endTime < overlapSlot.endTime ? endTime : overlapSlot.endTime;

      setOverlapError(ACTIVITY_ERROR_MESSAGES.SCHEDULE_OVERLAP(overlapStart, overlapEnd));
    } else {
      setOverlapError('');
      onAddSlot({ startTime: start, endTime });

      // 추가 성공 시 입력 필드 초기화
      setTempStartTime('');
      setTempDuration('');
    }
  };

  // 에러가 떠 있고, 시작시간과 체험시간이 입력된 상태라면 유효성 검사 재실행
  useEffect(() => {
    if (overlapError && tempStartTime && tempDuration) {
      const timer = setTimeout(() => {
        handleAttemptAddSlot(tempStartTime, tempDuration);
      }, 0);

      // 언마운트 시 타이머 정리해서 메모리 누수 방지
      return () => clearTimeout(timer);
    }
    //NOTE: 사용자가 슬롯을 삭제했을 때만 로직을 실행해야 하기 때문에 모든 함수를 배열에 넣지 못함
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots]);

  // 시작 시간 선택 드롭다운의 onChange 핸들러
  const handleStartTimeChange = (val: string) => {
    setOverlapError('');
    setTempStartTime(val);
    handleAttemptAddSlot(val, tempDuration);
  };

  // 체험 시간 선택 드롭다운의 onChange 핸들러
  const handleDurationChange = (val: number | '') => {
    setOverlapError('');
    setTempDuration(val);
    handleAttemptAddSlot(tempStartTime, val);
  };

  return {
    tempStartTime,
    tempDuration,
    isExpanded,
    setIsExpanded,
    overlapError,
    handleStartTimeChange,
    handleDurationChange,
  };
};
