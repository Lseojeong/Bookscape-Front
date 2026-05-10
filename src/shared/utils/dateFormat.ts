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
