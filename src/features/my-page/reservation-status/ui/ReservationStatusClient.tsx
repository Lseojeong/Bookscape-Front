'use client';

import { format } from 'date-fns';
import { useState } from 'react';
import { useMyActivitiesQuery } from '@/features/my-page/reservation-status/hooks/useMyActivitiesQuery';
import { useReservationDashboardQuery } from '@/features/my-page/reservation-status/hooks/useReservationDashboardQuery';
import {
  MOCK_PANEL_SCHEDULES,
  MOCK_RESERVATIONS,
} from '@/features/my-page/reservation-status/mocks/index';
import ReservationCalendar from '@/features/my-page/reservation-status/ui/calendar/ReservationCalendar';
import ReservationPanel from '@/features/my-page/reservation-status/ui/pannel/ReservationPanel';
import SelectDropdown from '@/shared/ui/dropdown/select/SelectDropdown';
import SelectDropdownContent from '@/shared/ui/dropdown/select/SelectDropdownContent';
import SelectDropdownItem from '@/shared/ui/dropdown/select/SelectDropdownItem';
import SelectDropdownTrigger from '@/shared/ui/dropdown/select/SelectDropdownTrigger';
import SelectDropdownValue from '@/shared/ui/dropdown/select/SelectDropdownValue';
import EmptyState from '@/shared/ui/empty-state/EmptyState';

/**
 * 예약 현황 페이지의 클라이언트 컴포넌트.
 *
 * - 체험 선택 드롭다운, 캘린더, 예약 패널의 상태를 관리합니다.
 * - 날짜 클릭 시 해당 날짜의 예약 패널을 엽니다.
 *
 * @param activities - 서버에서 전달받은 체험 목록
 */
export default function ReservationStatusClient() {
  const [month, setMonth] = useState(new Date());
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);

  // 내 체험 리스트 조회
  const { data: activities = [], isLoading } = useMyActivitiesQuery();

  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null);

  // activities 로드 후 첫 번째 체험 자동 선택
  const activityId = selectedActivityId ?? activities[0]?.id ?? null;

  // 달력 예약 현황 조회
  const { data: calendarSchedules = [] } = useReservationDashboardQuery(activityId, month);

  // TODO: 패널 API 연동 후 Mock 제거
  const currentPanelSchedules = selectedDateStr
    ? (MOCK_PANEL_SCHEDULES[activityId ?? 1]?.[selectedDateStr] ?? [])
    : [];
  const currentReservations = selectedDateStr
    ? (MOCK_RESERVATIONS[activityId ?? 1]?.[selectedDateStr] ?? [])
    : [];

  const handleDateClick = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    setSelectedDate(date);
    setSelectedDateStr(dateStr);
    requestAnimationFrame(() => {
      setPanelOpen(true);
    });
  };

  //TODO : 로딩 상태 UI 개선
  if (isLoading) return <div>로딩 중...</div>;

  if (activities.length === 0) {
    return (
      <EmptyState
        type="experience"
        mainText={'아직 등록한 체험이 없어요.\n새로운 체험을 등록해보세요!'}
      />
    );
  }

  return (
    <>
      <SelectDropdown
        value={String(activityId ?? '')}
        onChangeValue={(id) => setSelectedActivityId(Number(id))}
      >
        <SelectDropdownTrigger>
          <SelectDropdownValue
            render={(value) => activities.find((a) => String(a.id) === value)?.title}
          />
        </SelectDropdownTrigger>
        <SelectDropdownContent>
          {activities.map((activity) => (
            <SelectDropdownItem key={activity.id} value={String(activity.id)}>
              {activity.title}
            </SelectDropdownItem>
          ))}
        </SelectDropdownContent>
      </SelectDropdown>

      <ReservationCalendar
        month={month}
        onMonthChange={setMonth}
        schedules={calendarSchedules}
        onDateClick={handleDateClick}
      />

      <ReservationPanel
        key={selectedDateStr ?? ''}
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        date={selectedDate}
        schedules={currentPanelSchedules}
        reservations={currentReservations}
      />
    </>
  );
}
