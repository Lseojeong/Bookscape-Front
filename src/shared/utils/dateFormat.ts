/**
 * `YYYY-MM-DD` 형식의 날짜 문자열을 `YYYY. MM. DD`로 포맷합니다.
 *
 * - 입력이 예상 형식이 아니면 원본 문자열을 그대로 반환합니다.
 *
 * @example
 * formatYmdToDot('2026-05-09') // '2026. 05. 09'
 */
export const formatYmdToDot = (value: string): string => {
  const [year, month, day] = value.split('-');
  if (!year || !month || !day) return value;
  return `${year}. ${month.padStart(2, '0')}. ${day.padStart(2, '0')}`;
};

/**
 * 예약 일정 텍스트를 `YYYY. MM. DD / HH:mm - HH:mm (N명)` 형식으로 생성합니다.
 *
 * @example
 * formatReservationScheduleText({ date: '2026-05-09', startTime: '11:00', endTime: '12:30', headCount: 10 })
 * // '2026. 05. 09 / 11:00 - 12:30 (10명)'
 */
export const formatReservationScheduleText = ({
  date,
  startTime,
  endTime,
  headCount,
}: {
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
}): string => {
  return `${formatYmdToDot(date)} / ${startTime} - ${endTime} (${headCount}명)`;
};
