'use client';

import { useState } from 'react';
import { DeleteIcon } from '@/shared/assets/icons';
import SelectDropdown from '@/shared/ui/dropdown/select/SelectDropdown';
import SelectDropdownContent from '@/shared/ui/dropdown/select/SelectDropdownContent';
import SelectDropdownItem from '@/shared/ui/dropdown/select/SelectDropdownItem';
import SelectDropdownTrigger from '@/shared/ui/dropdown/select/SelectDropdownTrigger';
import SelectDropdownValue from '@/shared/ui/dropdown/select/SelectDropdownValue';
import FormLabel from '@/shared/ui/form/FormLabel';
import TabBar from '@/shared/ui/tab-bar/TabBar';
import type { Schedule, Reservation, ReservationStatus } from '../types/reservation';
import ReservationCard from './ReservationCard';

type ReservationPanelContentProps = {
  date: Date;
  schedules: Schedule[];
  reservations: Reservation[];
  onClose: () => void;
};

const formatDate = (d: Date) => `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;

const TAB_LABELS: Record<ReservationStatus, string> = {
  pending: '신청',
  confirmed: '승인',
  declined: '거절',
};

const getInitialTab = (reservations: Reservation[]): ReservationStatus => {
  if (reservations.some((r) => r.status === 'pending')) return 'pending';
  if (reservations.some((r) => r.status === 'confirmed')) return 'confirmed';
  if (reservations.some((r) => r.status === 'declined')) return 'declined';
  return 'pending';
};
/**
 * 예약 목록을 기준으로 초기 활성 탭을 결정합니다.
 * `'pending'` → `'confirmed'` → `'declined'` 순으로 우선순위를 적용하며,
 * 해당 상태의 예약이 하나라도 존재하면 그 탭을 반환합니다.
 *
 * @param reservations - 전체 예약 목록
 * @returns 초기 활성 탭의 상태값
 */
const getInitialScheduleId = (
  schedules: Schedule[],
  reservations: Reservation[],
  tab: ReservationStatus
): number => {
  const first = schedules.find((s) =>
    reservations.some((r) => r.scheduleId === s.scheduleId && r.status === tab)
  );
  return first?.scheduleId ?? schedules[0]?.scheduleId ?? 0;
};

/**
 * 예약 패널의 실제 콘텐츠를 렌더링하는 컴포넌트.
 *
 * - 상태별 탭(신청 / 승인 / 거절)으로 예약을 분류합니다.
 * - 드롭다운으로 시간대(스케줄)를 선택하면 해당 시간대의 예약 카드 목록이 표시됩니다.
 * - 탭 변경 시 해당 상태의 예약이 있는 첫 번째 스케줄로 자동 이동합니다.
 * - 승인 / 거절 처리는 API 연결 전까지 로컬 상태로 관리됩니다.
 *
 * @example
 * ```tsx
 * <ReservationPanelContent
 *   date={selectedDate}
 *   schedules={schedules}
 *   reservations={reservations}
 *   onClose={handleClose}
 * />
 * ```
 */
export default function ReservationPanelContent({
  date,
  schedules,
  reservations,
  onClose,
}: ReservationPanelContentProps) {
  const initialTab = getInitialTab(reservations);

  const [activeTab, setActiveTab] = useState<ReservationStatus>(initialTab);
  const [selectedScheduleId, setSelectedScheduleId] = useState(
    getInitialScheduleId(schedules, reservations, initialTab)
  );
  const [localReservations, setLocalReservations] = useState<Reservation[]>(reservations);

  //TODO: API 연결 후 삭제 - 패널 내 탭용 (날짜+시간대별 예약 목록)
  const TABS = [
    {
      id: 'pending',
      label: TAB_LABELS.pending,
      count: localReservations.filter((r) => r.status === 'pending').length,
    },
    {
      id: 'confirmed',
      label: TAB_LABELS.confirmed,
      count: localReservations.filter((r) => r.status === 'confirmed').length,
    },
    {
      id: 'declined',
      label: TAB_LABELS.declined,
      count: localReservations.filter((r) => r.status === 'declined').length,
    },
  ];

  // 현재 탭에 해당하는 예약이 있는 시간대만 필터링
  const availableSchedules = schedules.filter((s) =>
    localReservations.some((r) => r.scheduleId === s.scheduleId && r.status === activeTab)
  );

  const handleTabChange = (id: string) => {
    const nextTab = id as ReservationStatus;
    const firstAvailable = schedules.find((s) =>
      localReservations.some((r) => r.scheduleId === s.scheduleId && r.status === nextTab)
    );
    setActiveTab(nextTab);
    setSelectedScheduleId(firstAvailable?.scheduleId ?? schedules[0]?.scheduleId ?? 0);
  };

  const filtered = localReservations.filter(
    (r) => r.scheduleId === selectedScheduleId && r.status === activeTab
  );

  const handleConfirm = (id: number) => {
    setLocalReservations((prev) => {
      const updated = prev.map((r) => (r.id === id ? { ...r, status: 'confirmed' as const } : r));
      const stillAvailable = schedules.filter((s) =>
        updated.some((r) => r.scheduleId === s.scheduleId && r.status === activeTab)
      );
      if (!stillAvailable.find((s) => s.scheduleId === selectedScheduleId)) {
        setSelectedScheduleId(stillAvailable[0]?.scheduleId ?? 0);
      }
      return updated;
    });
  };

  const handleDecline = (id: number) => {
    setLocalReservations((prev) => {
      const updated = prev.map((r) => (r.id === id ? { ...r, status: 'declined' as const } : r));
      const stillAvailable = schedules.filter((s) =>
        updated.some((r) => r.scheduleId === s.scheduleId && r.status === activeTab)
      );
      if (!stillAvailable.find((s) => s.scheduleId === selectedScheduleId)) {
        setSelectedScheduleId(stillAvailable[0]?.scheduleId ?? 0);
      }
      return updated;
    });
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden px-6 py-8">
      {/* 헤더 */}
      <div className="shrink-0">
        <p className="typo-18-bold lg:typo-24-bold">{formatDate(date)}</p>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700 lg:top-5 lg:right-5"
          aria-label="닫기"
        >
          <DeleteIcon className="h-8 w-8" />
        </button>
      </div>

      {/* 탭 */}
      <div className="mt-4.5 shrink-0">
        <TabBar
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          tabClassName="flex-1"
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        {availableSchedules.length === 0 ? (
          <p className="mt-3 text-center typo-14-medium text-gray-400">
            {TAB_LABELS[activeTab]} 내역이 없습니다.
          </p>
        ) : (
          <>
            <div className="flex min-h-0 flex-1 flex-col md:flex-row md:justify-center md:gap-5 lg:flex-col lg:justify-start lg:gap-0">
              {/* 시간대 선택 */}
              <div className="md:w-1/2 lg:w-full">
                <FormLabel className="mt-5 mb-3 typo-18-bold lg:mt-7.5">예약 시간</FormLabel>
                <SelectDropdown
                  value={String(selectedScheduleId)}
                  onChangeValue={(id) => setSelectedScheduleId(Number(id))}
                >
                  <SelectDropdownTrigger>
                    <SelectDropdownValue
                      render={(value) => {
                        const s = availableSchedules.find((s) => String(s.scheduleId) === value);
                        return s ? `${s.startTime}~${s.endTime}` : '';
                      }}
                    />
                  </SelectDropdownTrigger>
                  <SelectDropdownContent>
                    {availableSchedules.map((s) => (
                      <SelectDropdownItem key={s.scheduleId} value={String(s.scheduleId)}>
                        {s.startTime}~{s.endTime}
                      </SelectDropdownItem>
                    ))}
                  </SelectDropdownContent>
                </SelectDropdown>
              </div>

              {/* 카드 목록 */}
              <div className="flex min-h-0 flex-1 flex-col md:w-1/2 lg:w-full">
                <FormLabel className="mt-5 mb-3 typo-18-bold lg:mt-7.5">예약내역</FormLabel>
                <div className="min-h-0 flex-1 overflow-y-auto">
                  <div className="flex flex-col gap-3">
                    {filtered.length === 0 ? (
                      <p className="text-sm text-gray-400">
                        {TAB_LABELS[activeTab]} 내역이 없습니다.
                      </p>
                    ) : (
                      filtered.map((r) => (
                        <ReservationCard
                          key={r.id}
                          reservation={r}
                          onConfirm={activeTab === 'pending' ? handleConfirm : undefined}
                          onDecline={activeTab === 'pending' ? handleDecline : undefined}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
