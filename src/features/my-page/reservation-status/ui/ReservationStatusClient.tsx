'use client';

import { format } from 'date-fns';
import { useState } from 'react';
import { useReservationDashboardQuery } from '@/features/my-page/reservation-status/hooks/useReservationDashboardQuery';
import {
  MOCK_ACTIVITIES,
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

/** TODO: API 연결 후 실제 타입으로 교체 */
type Activity = (typeof MOCK_ACTIVITIES)[number];

type ReservationStatusClientProps = {
  activities: Activity[];
};

/**
 * 예약 현황 페이지의 클라이언트 컴포넌트.
 *
 * - 체험 선택 드롭다운, 캘린더, 예약 패널의 상태를 관리합니다.
 * - 날짜 클릭 시 해당 날짜의 예약 패널을 엽니다.
 *
 * @param activities - 서버에서 전달받은 체험 목록
 */
export default function ReservationStatusClient({ activities }: ReservationStatusClientProps) {
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(
    activities[0]?.id ?? null
  );
  const [month, setMonth] = useState(new Date());
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);

  const activityId = selectedActivityId ?? 1;
  const currentPanelSchedules = selectedDateStr
    ? (MOCK_PANEL_SCHEDULES[activityId]?.[selectedDateStr] ?? [])
    : [];
  const currentReservations = selectedDateStr
    ? (MOCK_RESERVATIONS[activityId]?.[selectedDateStr] ?? [])
    : [];

  const { data: calendarSchedules = [] } = useReservationDashboardQuery(selectedActivityId, month);
  const handleDateClick = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    setSelectedDate(date);
    setSelectedDateStr(dateStr);
    requestAnimationFrame(() => {
      setPanelOpen(true);
    });
  };

  return (
    <>
      <SelectDropdown
        value={String(selectedActivityId ?? '')}
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
