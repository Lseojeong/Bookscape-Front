/**
 * 서버에 저장된 종료 시간을 화면에 표시할 때 사용합니다.
 * 23:59를 24:00으로 변환하여 노출합니다.
 * * @example
 * formatEndTimeForUI('23:59') // '24:00'
 * formatEndTimeForUI('11:00') // '11:00'
 */
export const formatEndTime = (endTime: string): string => {
  return endTime === '23:59' ? '24:00' : endTime;
};
