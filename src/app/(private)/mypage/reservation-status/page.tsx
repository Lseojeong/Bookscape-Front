'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SelectDropdown from '@/shared/ui/dropdown/select/SelectDropdown';
import SelectDropdownContent from '@/shared/ui/dropdown/select/SelectDropdownContent';
import SelectDropdownItem from '@/shared/ui/dropdown/select/SelectDropdownItem';
import SelectDropdownTrigger from '@/shared/ui/dropdown/select/SelectDropdownTrigger';
import SelectDropdownValue from '@/shared/ui/dropdown/select/SelectDropdownValue';
import PageHeader from '@/shared/ui/page-header/PageHeader';
import ReservationCalendar from './components/ReservationCalendar';
import ReservationPanel from './components/ReservationPanel';
import type { CalendarSchedule, Schedule, Reservation } from './types/reservation';

// TODO: API 연결 후 삭제
const MOCK_ACTIVITIES = [
  { id: 1, title: '함께 배우면 즐거운 스트릿 댄스' },
  { id: 2, title: '한강 야경 보며 즐기는 요트 파티' },
  { id: 3, title: '초보자를 위한 서핑 클래스' },
];

// TODO: API 연결 후 삭제 - 달력용 (월별 예약 현황)
const MOCK_CALENDAR_SCHEDULES: Record<number, CalendarSchedule[]> = {
  1: [
    { date: '2026-05-09', reservations: { completed: 10, confirmed: 0, pending: 0 } }, // completed만 → 클릭은 되지만 패널에 신청/승인 없음
    { date: '2026-05-10', reservations: { completed: 0, confirmed: 2, pending: 0 } }, // 승인 2
    { date: '2026-05-11', reservations: { completed: 0, confirmed: 2, pending: 8 } }, // 승인 2 + 신청 8
    { date: '2026-05-12', reservations: { completed: 0, confirmed: 2, pending: 0 } }, // 승인 2
  ],
  2: [
    { date: '2026-05-15', reservations: { completed: 0, confirmed: 3, pending: 0 } },
    { date: '2026-05-20', reservations: { completed: 5, confirmed: 0, pending: 2 } },
  ],
  3: [{ date: '2026-05-25', reservations: { completed: 0, confirmed: 0, pending: 4 } }],
};

// TODO: API 연결 후 삭제 - 패널용 (날짜별 시간대 목록)
const MOCK_PANEL_SCHEDULES: Record<number, Record<string, Schedule[]>> = {
  1: {
    '2026-05-09': [
      {
        scheduleId: 1,
        startTime: '14:00',
        endTime: '15:00',
        count: { declined: 0, confirmed: 0, pending: 0 },
      },
    ],
    '2026-05-10': [
      {
        scheduleId: 2,
        startTime: '14:00',
        endTime: '15:00',
        count: { declined: 0, confirmed: 2, pending: 0 },
      },
    ],
    '2026-05-11': [
      {
        scheduleId: 3,
        startTime: '14:00',
        endTime: '15:00',
        count: { declined: 2, confirmed: 2, pending: 8 },
      },
    ],
    '2026-05-12': [
      {
        scheduleId: 4,
        startTime: '14:00',
        endTime: '15:00',
        count: { declined: 1, confirmed: 2, pending: 0 },
      },
    ],
    '2026-05-20': [
      {
        scheduleId: 4,
        startTime: '14:00',
        endTime: '15:00',
        count: { declined: 1, confirmed: 0, pending: 0 },
      },
    ],
  },
  2: {
    '2026-05-15': [
      {
        scheduleId: 5,
        startTime: '10:00',
        endTime: '11:00',
        count: { declined: 0, confirmed: 3, pending: 0 },
      },
    ],
    '2026-05-20': [
      {
        scheduleId: 6,
        startTime: '13:00',
        endTime: '14:00',
        count: { declined: 1, confirmed: 0, pending: 2 },
      }, // declined 1 추가
    ],
  },
  3: {
    '2026-05-25': [
      {
        scheduleId: 7,
        startTime: '09:00',
        endTime: '10:00',
        count: { declined: 0, confirmed: 0, pending: 4 },
      },
    ],
  },
};

// TODO: API 연결 후 삭제 - 패널 내 카드용 (날짜+시간대별 예약 목록)
const MOCK_RESERVATIONS: Record<number, Record<string, Reservation[]>> = {
  1: {
    '2026-05-09': [],
    '2026-05-10': [
      {
        id: 3,
        nickname: '박지호',
        userId: 3,
        teamId: 'team1',
        activityId: 1,
        scheduleId: 2,
        status: 'confirmed',
        reviewSubmitted: false,
        totalPrice: 10000,
        headCount: 3,
        date: '2026-05-10',
        startTime: '14:00',
        endTime: '15:00',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 4,
        nickname: '최수아',
        userId: 4,
        teamId: 'team1',
        activityId: 1,
        scheduleId: 2,
        status: 'confirmed',
        reviewSubmitted: false,
        totalPrice: 10000,
        headCount: 4,
        date: '2026-05-10',
        startTime: '14:00',
        endTime: '15:00',
        createdAt: '',
        updatedAt: '',
      },
    ],
    '2026-05-11': [
      // confirmed 2개
      {
        id: 5,
        nickname: '정도윤',
        userId: 5,
        teamId: 'team1',
        activityId: 1,
        scheduleId: 3,
        status: 'confirmed',
        reviewSubmitted: false,
        totalPrice: 10000,
        headCount: 5,
        date: '2026-05-11',
        startTime: '14:00',
        endTime: '15:00',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 6,
        nickname: '강하은',
        userId: 6,
        teamId: 'team1',
        activityId: 1,
        scheduleId: 3,
        status: 'confirmed',
        reviewSubmitted: false,
        totalPrice: 10000,
        headCount: 6,
        date: '2026-05-11',
        startTime: '14:00',
        endTime: '15:00',
        createdAt: '',
        updatedAt: '',
      },
      // pending 8개
      {
        id: 7,
        nickname: '윤서준',
        userId: 7,
        teamId: 'team1',
        activityId: 1,
        scheduleId: 3,
        status: 'pending',
        reviewSubmitted: false,
        totalPrice: 10000,
        headCount: 1,
        date: '2026-05-11',
        startTime: '14:00',
        endTime: '15:00',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 8,
        nickname: '임지우',
        userId: 8,
        teamId: 'team1',
        activityId: 1,
        scheduleId: 3,
        status: 'pending',
        reviewSubmitted: false,
        totalPrice: 10000,
        headCount: 2,
        date: '2026-05-11',
        startTime: '14:00',
        endTime: '15:00',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 9,
        nickname: '한소율',
        userId: 9,
        teamId: 'team1',
        activityId: 1,
        scheduleId: 3,
        status: 'pending',
        reviewSubmitted: false,
        totalPrice: 10000,
        headCount: 3,
        date: '2026-05-11',
        startTime: '14:00',
        endTime: '15:00',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 10,
        nickname: '오지훈',
        userId: 10,
        teamId: 'team1',
        activityId: 1,
        scheduleId: 3,
        status: 'pending',
        reviewSubmitted: false,
        totalPrice: 10000,
        headCount: 4,
        date: '2026-05-11',
        startTime: '14:00',
        endTime: '15:00',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 11,
        nickname: '송예은',
        userId: 11,
        teamId: 'team1',
        activityId: 1,
        scheduleId: 3,
        status: 'pending',
        reviewSubmitted: false,
        totalPrice: 10000,
        headCount: 5,
        date: '2026-05-11',
        startTime: '14:00',
        endTime: '15:00',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 12,
        nickname: '배준호',
        userId: 12,
        teamId: 'team1',
        activityId: 1,
        scheduleId: 3,
        status: 'pending',
        reviewSubmitted: false,
        totalPrice: 10000,
        headCount: 6,
        date: '2026-05-11',
        startTime: '14:00',
        endTime: '15:00',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 13,
        nickname: '신다은',
        userId: 13,
        teamId: 'team1',
        activityId: 1,
        scheduleId: 3,
        status: 'pending',
        reviewSubmitted: false,
        totalPrice: 10000,
        headCount: 7,
        date: '2026-05-11',
        startTime: '14:00',
        endTime: '15:00',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 14,
        nickname: '류민성',
        userId: 14,
        teamId: 'team1',
        activityId: 1,
        scheduleId: 3,
        status: 'pending',
        reviewSubmitted: false,
        totalPrice: 10000,
        headCount: 8,
        date: '2026-05-11',
        startTime: '14:00',
        endTime: '15:00',
        createdAt: '',
        updatedAt: '',
      },
      // declined 2개
      {
        id: 26,
        nickname: '김태현',
        userId: 26,
        teamId: 'team1',
        activityId: 1,
        scheduleId: 3,
        status: 'declined',
        reviewSubmitted: false,
        totalPrice: 10000,
        headCount: 2,
        date: '2026-05-11',
        startTime: '14:00',
        endTime: '15:00',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 27,
        nickname: '이수진',
        userId: 27,
        teamId: 'team1',
        activityId: 1,
        scheduleId: 3,
        status: 'declined',
        reviewSubmitted: false,
        totalPrice: 10000,
        headCount: 3,
        date: '2026-05-11',
        startTime: '14:00',
        endTime: '15:00',
        createdAt: '',
        updatedAt: '',
      },
    ],
    '2026-05-12': [
      // confirmed 2개
      {
        id: 15,
        nickname: '황지민',
        userId: 15,
        teamId: 'team1',
        activityId: 1,
        scheduleId: 4,
        status: 'confirmed',
        reviewSubmitted: false,
        totalPrice: 10000,
        headCount: 1,
        date: '2026-05-12',
        startTime: '14:00',
        endTime: '15:00',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 16,
        nickname: '전수빈',
        userId: 16,
        teamId: 'team1',
        activityId: 1,
        scheduleId: 4,
        status: 'confirmed',
        reviewSubmitted: false,
        totalPrice: 10000,
        headCount: 2,
        date: '2026-05-12',
        startTime: '14:00',
        endTime: '15:00',
        createdAt: '',
        updatedAt: '',
      },
      // declined 1개
      {
        id: 28,
        nickname: '박서준',
        userId: 28,
        teamId: 'team1',
        activityId: 1,
        scheduleId: 4,
        status: 'declined',
        reviewSubmitted: false,
        totalPrice: 10000,
        headCount: 1,
        date: '2026-05-12',
        startTime: '14:00',
        endTime: '15:00',
        createdAt: '',
        updatedAt: '',
      },
    ],
  },
  2: {
    '2026-05-15': [
      {
        id: 17,
        nickname: '고은채',
        userId: 17,
        teamId: 'team1',
        activityId: 2,
        scheduleId: 5,
        status: 'confirmed',
        reviewSubmitted: false,
        totalPrice: 20000,
        headCount: 1,
        date: '2026-05-15',
        startTime: '10:00',
        endTime: '11:00',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 18,
        nickname: '남도현',
        userId: 18,
        teamId: 'team1',
        activityId: 2,
        scheduleId: 5,
        status: 'confirmed',
        reviewSubmitted: false,
        totalPrice: 20000,
        headCount: 2,
        date: '2026-05-15',
        startTime: '10:00',
        endTime: '11:00',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 19,
        nickname: '문지아',
        userId: 19,
        teamId: 'team1',
        activityId: 2,
        scheduleId: 5,
        status: 'confirmed',
        reviewSubmitted: false,
        totalPrice: 20000,
        headCount: 3,
        date: '2026-05-15',
        startTime: '10:00',
        endTime: '11:00',
        createdAt: '',
        updatedAt: '',
      },
    ],
    '2026-05-20': [
      {
        id: 20,
        nickname: '변승우',
        userId: 20,
        teamId: 'team1',
        activityId: 2,
        scheduleId: 6,
        status: 'pending',
        reviewSubmitted: false,
        totalPrice: 20000,
        headCount: 1,
        date: '2026-05-20',
        startTime: '13:00',
        endTime: '14:00',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 21,
        nickname: '서지현',
        userId: 21,
        teamId: 'team1',
        activityId: 2,
        scheduleId: 6,
        status: 'pending',
        reviewSubmitted: false,
        totalPrice: 20000,
        headCount: 2,
        date: '2026-05-20',
        startTime: '13:00',
        endTime: '14:00',
        createdAt: '',
        updatedAt: '',
      },
      // declined 1개
      {
        id: 29,
        nickname: '조민호',
        userId: 29,
        teamId: 'team1',
        activityId: 2,
        scheduleId: 6,
        status: 'declined',
        reviewSubmitted: false,
        totalPrice: 20000,
        headCount: 1,
        date: '2026-05-20',
        startTime: '13:00',
        endTime: '14:00',
        createdAt: '',
        updatedAt: '',
      },
    ],
  },
  3: {
    '2026-05-25': [
      {
        id: 22,
        nickname: '안지호',
        userId: 22,
        teamId: 'team1',
        activityId: 3,
        scheduleId: 7,
        status: 'pending',
        reviewSubmitted: false,
        totalPrice: 30000,
        headCount: 1,
        date: '2026-05-25',
        startTime: '09:00',
        endTime: '10:00',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 23,
        nickname: '양수진',
        userId: 23,
        teamId: 'team1',
        activityId: 3,
        scheduleId: 7,
        status: 'pending',
        reviewSubmitted: false,
        totalPrice: 30000,
        headCount: 2,
        date: '2026-05-25',
        startTime: '09:00',
        endTime: '10:00',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 24,
        nickname: '엄태양',
        userId: 24,
        teamId: 'team1',
        activityId: 3,
        scheduleId: 7,
        status: 'pending',
        reviewSubmitted: false,
        totalPrice: 30000,
        headCount: 3,
        date: '2026-05-25',
        startTime: '09:00',
        endTime: '10:00',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 25,
        nickname: '위다은',
        userId: 25,
        teamId: 'team1',
        activityId: 3,
        scheduleId: 7,
        status: 'pending',
        reviewSubmitted: false,
        totalPrice: 30000,
        headCount: 4,
        date: '2026-05-25',
        startTime: '09:00',
        endTime: '10:00',
        createdAt: '',
        updatedAt: '',
      },
    ],
  },
};

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
    </div>
  );
}
