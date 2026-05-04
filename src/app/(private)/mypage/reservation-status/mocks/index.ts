import type { CalendarSchedule, Schedule, Reservation } from '../types/reservation';

// TODO: API 연결 후 삭제
export const MOCK_ACTIVITIES = [
  { id: 1, title: '함께 배우면 즐거운 스트릿 댄스' },
  { id: 2, title: '한강 야경 보며 즐기는 요트 파티' },
  { id: 3, title: '초보자를 위한 서핑 클래스' },
];

// TODO: API 연결 후 삭제 - 달력용
export const MOCK_CALENDAR_SCHEDULES: Record<number, CalendarSchedule[]> = {
  // ...
};

// TODO: API 연결 후 삭제 - 패널 시간대용
export const MOCK_PANEL_SCHEDULES: Record<number, Record<string, Schedule[]>> = {
  // ...
};

// TODO: API 연결 후 삭제 - 패널 카드용
export const MOCK_RESERVATIONS: Record<number, Record<string, Reservation[]>> = {
  // ...
};
