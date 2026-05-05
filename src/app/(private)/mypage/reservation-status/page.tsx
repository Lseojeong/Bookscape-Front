'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ReservationCalendar from '@/app/(private)/mypage/reservation-status/components/ReservationCalendar';
import ReservationPanel from '@/app/(private)/mypage/reservation-status/components/ReservationPanel';
import SelectDropdown from '@/shared/ui/dropdown/select/SelectDropdown';
import SelectDropdownContent from '@/shared/ui/dropdown/select/SelectDropdownContent';
import SelectDropdownItem from '@/shared/ui/dropdown/select/SelectDropdownItem';
import SelectDropdownTrigger from '@/shared/ui/dropdown/select/SelectDropdownTrigger';
import SelectDropdownValue from '@/shared/ui/dropdown/select/SelectDropdownValue';
import EmptyState from '@/shared/ui/empty-state/EmptyState';
import PageHeader from '@/shared/ui/page-header/PageHeader';
import {
  MOCK_ACTIVITIES,
  MOCK_CALENDAR_SCHEDULES,
  MOCK_PANEL_SCHEDULES,
  MOCK_RESERVATIONS,
} from './mocks';

const toDateStr = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export default function ReservationStatusPage() {
  const router = useRouter();
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(
    MOCK_ACTIVITIES[0]?.id ?? null
  );
  const [month, setMonth] = useState(new Date());
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);

  const activityId = selectedActivityId ?? 1;
  const currentCalendarSchedules = MOCK_CALENDAR_SCHEDULES[activityId] ?? [];
  const currentPanelSchedules = selectedDateStr
    ? (MOCK_PANEL_SCHEDULES[activityId]?.[selectedDateStr] ?? [])
    : [];
  const currentReservations = selectedDateStr
    ? (MOCK_RESERVATIONS[activityId]?.[selectedDateStr] ?? [])
    : [];

  const handleDateClick = (date: Date) => {
    const dateStr = toDateStr(date);
    setSelectedDate(date);
    setSelectedDateStr(dateStr);
    requestAnimationFrame(() => {
      setPanelOpen(true);
    });
  };

  return (
    <div className="mb-10 flex w-full flex-col gap-6 md:w-119 lg:w-160">
      <PageHeader
        title="예약 현황"
        description="내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다."
        onBack={() => router.back()}
      />

      {MOCK_ACTIVITIES.length === 0 ? (
        <EmptyState
          type="experience"
          mainText={'아직 등록한 체험이 없어요.\n새로운 체험을 등록해보세요!'}
        />
      ) : (
        <>
          <SelectDropdown
            value={String(selectedActivityId ?? '')}
            onChangeValue={(id) => setSelectedActivityId(Number(id))}
          >
            <SelectDropdownTrigger>
              <SelectDropdownValue
                render={(value) => MOCK_ACTIVITIES.find((a) => String(a.id) === value)?.title}
              />
            </SelectDropdownTrigger>
            <SelectDropdownContent>
              {MOCK_ACTIVITIES.map((activity) => (
                <SelectDropdownItem key={activity.id} value={String(activity.id)}>
                  {activity.title}
                </SelectDropdownItem>
              ))}
            </SelectDropdownContent>
          </SelectDropdown>

          <ReservationCalendar
            month={month}
            onMonthChange={setMonth}
            schedules={currentCalendarSchedules}
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
      )}
    </div>
  );
}
