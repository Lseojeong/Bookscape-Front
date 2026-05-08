import { useState } from 'react';
import type {
  Schedule,
  Reservation,
  ReservationStatus,
} from '@/features/my-page/reservation-status/types/reservation';

/**
 * 예약 목록을 기준으로 초기 활성 탭을 결정합니다.
 * `'pending'` → `'confirmed'` → `'declined'` 순으로 우선순위를 적용하며,
 * 해당 상태의 예약이 하나라도 존재하면 그 탭을 반환합니다.
 *
 * @param reservations - 전체 예약 목록
 * @returns 초기 활성 탭의 상태값
 */
const getInitialTab = (reservations: Reservation[]): ReservationStatus => {
  if (reservations.some((r) => r.status === 'pending')) return 'pending';
  if (reservations.some((r) => r.status === 'confirmed')) return 'confirmed';
  if (reservations.some((r) => r.status === 'declined')) return 'declined';
  return 'pending';
};

/**
 * 초기 선택 스케줄 ID를 결정합니다.
 * 현재 활성 탭 상태에 해당하는 예약이 있는 첫 번째 스케줄을 반환합니다.
 *
 * @param schedules - 전체 스케줄 목록
 * @param reservations - 전체 예약 목록
 * @param tab - 현재 활성 탭 상태
 * @returns 초기 선택 스케줄 ID
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
 * 예약 패널의 상태 관리 로직을 담당하는 커스텀 훅.
 *
 * - 활성 탭(신청 / 승인 / 거절) 상태를 관리합니다.
 * - 탭 변경 시 해당 상태의 예약이 있는 첫 번째 스케줄로 자동 이동합니다.
 * - 선택된 스케줄 ID를 기준으로 예약 목록을 필터링합니다.
 * - 승인 / 거절 처리는 API 연결 전까지 로컬 상태로 관리합니다.
 *
 * @param schedules - 전체 스케줄 목록
 * @param reservations - 전체 예약 목록
 * @returns 탭, 스케줄, 예약 상태 및 핸들러
 */
export const useReservationPanel = (schedules: Schedule[], reservations: Reservation[]) => {
  const initialTab = getInitialTab(reservations);

  const [activeTab, setActiveTab] = useState<ReservationStatus>(initialTab);
  const [selectedScheduleId, setSelectedScheduleId] = useState(
    getInitialScheduleId(schedules, reservations, initialTab)
  );
  const [localReservations, setLocalReservations] = useState<Reservation[]>(reservations);

  /** 현재 탭에 해당하는 예약이 있는 스케줄 목록 */
  const availableSchedules = schedules.filter((s) =>
    localReservations.some((r) => r.scheduleId === s.scheduleId && r.status === activeTab)
  );

  /** 현재 탭 + 선택된 스케줄에 해당하는 예약 목록 */
  const filtered = localReservations.filter(
    (r) => r.scheduleId === selectedScheduleId && r.status === activeTab
  );

  /**
   * 탭 변경 핸들러.
   * 변경된 탭에 해당하는 예약이 있는 첫 번째 스케줄로 자동 이동합니다.
   *
   * @param id - 변경할 탭 ID
   */
  const handleTabChange = (id: string) => {
    const nextTab = id as ReservationStatus;
    const firstAvailable = schedules.find((s) =>
      localReservations.some((r) => r.scheduleId === s.scheduleId && r.status === nextTab)
    );
    setActiveTab(nextTab);
    setSelectedScheduleId(firstAvailable?.scheduleId ?? schedules[0]?.scheduleId ?? 0);
  };

  /**
   * 예약 승인 핸들러.
   * 해당 예약의 상태를 `confirmed`로 변경합니다.
   * 승인 후 현재 탭에 해당하는 스케줄이 없으면 첫 번째 스케줄로 이동합니다.
   *
   * @param id - 승인할 예약 ID
   */
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

  /**
   * 예약 거절 핸들러.
   * 해당 예약의 상태를 `declined`로 변경합니다.
   * 거절 후 현재 탭에 해당하는 스케줄이 없으면 첫 번째 스케줄로 이동합니다.
   *
   * @param id - 거절할 예약 ID
   */
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

  return {
    activeTab,
    selectedScheduleId,
    localReservations,
    availableSchedules,
    filtered,
    handleTabChange,
    handleConfirm,
    handleDecline,
    setSelectedScheduleId,
  };
};
