'use client';

import { format } from 'date-fns';
import { useState } from 'react';
import { useMyActivitiesQuery } from '@/features/my-page/reservation-status/queries/useMyActivitiesQuery';
import { useReservationDashboardQuery } from '@/features/my-page/reservation-status/queries/useReservationDashboardQuery';
import { useReservedScheduleQuery } from '@/features/my-page/reservation-status/queries/useReservedScheduleQuery';
import ReservationCalendar from '@/features/my-page/reservation-status/ui/calendar/ReservationCalendar';
import ReservationPanel from '@/features/my-page/reservation-status/ui/pannel/ReservationPanel';
import ReservationStatusClientSkeleton from '@/features/my-page/reservation-status/ui/skeleton/ReservationStatusClientSkeleton';
import SelectDropdown from '@/shared/ui/dropdown/select/SelectDropdown';
import SelectDropdownContent from '@/shared/ui/dropdown/select/SelectDropdownContent';
import SelectDropdownItem from '@/shared/ui/dropdown/select/SelectDropdownItem';
import SelectDropdownTrigger from '@/shared/ui/dropdown/select/SelectDropdownTrigger';
import SelectDropdownValue from '@/shared/ui/dropdown/select/SelectDropdownValue';
import EmptyState from '@/shared/ui/empty-state/EmptyState';

/**
 * 예약 현황 페이지의 클라이언트 컴포넌트
 *
 * @description
 * - 내 체험 목록을 조회해 드롭다운에 표시합니다.
 * - 선택된 체험과 현재 월을 기준으로 달력 예약 현황을 조회합니다.
 * - 날짜 클릭 시 해당 날짜의 예약 패널을 엽니다.
 * - 체험이 없을 때 빈 상태를 표시합니다.
 */
export default function ReservationStatusClient() {
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null);
  const [month, setMonth] = useState(new Date());
  const [ispanelOpen, setIsPanelOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);

  // 내 체험 리스트 조회
  const { data: activities = [], isError, isLoading, refetch } = useMyActivitiesQuery();

  // 선택된 체험 ID (미선택 시 첫 번째 체험 자동 선택)
  const activityId = selectedActivityId ?? activities[0]?.id ?? null;

  // 달력 예약 현황 조회
  const { data: calendarSchedules = [] } = useReservationDashboardQuery(activityId, month);

  // 날짜별 스케줄 조회
  const { data: panelSchedules = [], isLoading: isSchedulesLoading } = useReservedScheduleQuery(
    activityId,
    selectedDateStr
  );

  /**
   * 날짜 클릭 핸들러
   * 선택된 날짜를 저장하고 예약 패널을 엽니다.
   */
  const handleDateClick = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    setSelectedDate(date);
    setSelectedDateStr(dateStr);
    requestAnimationFrame(() => setIsPanelOpen(true));
  };

  if (isLoading) return <ReservationStatusClientSkeleton />;

  if (isError)
    return (
      <EmptyState
        type="error"
        mainText={'체험 목록을 불러오는 데 실패했어요.\n다시 시도해주세요.'}
        onRetry={refetch}
      />
    );

  if (activities.length === 0)
    return (
      <EmptyState
        type="experience"
        mainText={'아직 등록한 체험이 없어요.\n새로운 체험을 등록해보세요!'}
        button={{ href: '/activity/new', text: '체험 등록하기' }}
      />
    );

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
        isOpen={ispanelOpen}
        onClose={() => setIsPanelOpen(false)}
        date={selectedDate}
        activityId={activityId}
        schedules={panelSchedules}
        isSchedulesLoading={isSchedulesLoading}
      />
    </>
  );
}
