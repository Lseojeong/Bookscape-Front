'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SelectDropdown from '@/shared/ui/dropdown/select/SelectDropdown';
import SelectDropdownContent from '@/shared/ui/dropdown/select/SelectDropdownContent';
import SelectDropdownItem from '@/shared/ui/dropdown/select/SelectDropdownItem';
import SelectDropdownTrigger from '@/shared/ui/dropdown/select/SelectDropdownTrigger';
import SelectDropdownValue from '@/shared/ui/dropdown/select/SelectDropdownValue';
import PageHeader from '@/shared/ui/page-header/PageHeader';
import ReservationCalendar, { type Schedule } from './ReservationCalendar';

// TODO: API 연결 후 삭제
const MOCK_ACTIVITIES = [
  { id: 1, title: '함께 배우면 즐거운 스트릿 댄스' },
  { id: 2, title: '한강 야경 보며 즐기는 요트 파티' },
  { id: 3, title: '초보자를 위한 서핑 클래스' },
];

// TODO: API 연결 후 삭제
const MOCK_SCHEDULES: Record<number, Schedule[]> = {
  1: [
    { date: '2026-05-09', reservations: { completed: 10, confirmed: 0, pending: 0 } },
    { date: '2026-05-10', reservations: { completed: 0, confirmed: 2, pending: 0 } },
    { date: '2026-05-11', reservations: { completed: 0, confirmed: 2, pending: 8 } },
    { date: '2026-05-12', reservations: { completed: 0, confirmed: 10, pending: 0 } },
  ],
  2: [
    { date: '2026-05-15', reservations: { completed: 0, confirmed: 3, pending: 0 } },
    { date: '2026-05-20', reservations: { completed: 5, confirmed: 0, pending: 2 } },
  ],
  3: [{ date: '2026-05-25', reservations: { completed: 0, confirmed: 0, pending: 4 } }],
};
export default function ReservationStatusPage() {
  const router = useRouter();
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(
    MOCK_ACTIVITIES[0]?.id ?? null
  );
  const [month, setMonth] = useState(new Date());
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
        schedules={MOCK_SCHEDULES[selectedActivityId ?? 1] ?? []}
      />
    </div>
  );
}
