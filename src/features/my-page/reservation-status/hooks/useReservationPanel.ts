import { useState } from 'react';
import type {
  MyActivityReservedScheduleItem,
  MyActivityReservation,
  SellerReservationStatus,
} from '@/features/my-page/types';

const getInitialTab = (reservations: MyActivityReservation[]): SellerReservationStatus => {
  if (reservations.some((r) => r.status === 'pending')) return 'pending';
  if (reservations.some((r) => r.status === 'confirmed')) return 'confirmed';
  if (reservations.some((r) => r.status === 'declined')) return 'declined';
  return 'pending';
};

const getFirstScheduleId = (
  schedules: MyActivityReservedScheduleItem[],
  reservations: MyActivityReservation[],
  tab: SellerReservationStatus
): number | null => {
  const first = schedules.find((s) =>
    reservations.some((r) => r.scheduleId === s.scheduleId && r.status === tab)
  );
  return first?.scheduleId ?? schedules[0]?.scheduleId ?? null;
};

export const useReservationPanel = (
  schedules: MyActivityReservedScheduleItem[],
  reservations: MyActivityReservation[]
) => {
  const [manualTab, setManualTab] = useState<SellerReservationStatus | null>(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);

  // 사용자가 탭을 직접 선택하지 않았으면 데이터 기반으로 자동 결정
  const activeTab =
    manualTab ?? (reservations.length > 0 ? getInitialTab(reservations) : 'pending');

  // 사용자가 스케줄을 직접 선택하지 않았으면 현재 탭 기반으로 자동 결정
  const resolvedScheduleId =
    selectedScheduleId ?? getFirstScheduleId(schedules, reservations, activeTab);

  const availableSchedules = schedules.filter((s) =>
    reservations.some((r) => r.scheduleId === s.scheduleId && r.status === activeTab)
  );

  const filtered = reservations.filter(
    (r) => r.scheduleId === resolvedScheduleId && r.status === activeTab
  );

  const handleTabChange = (id: string) => {
    const nextTab = id as SellerReservationStatus;
    const firstAvailable = schedules.find((s) =>
      reservations.some((r) => r.scheduleId === s.scheduleId && r.status === nextTab)
    );
    setManualTab(nextTab);
    setSelectedScheduleId(firstAvailable?.scheduleId ?? null);
  };

  const handleAfterStatusChange = (updatedReservations: MyActivityReservation[]) => {
    const stillAvailable = schedules.filter((s) =>
      updatedReservations.some((r) => r.scheduleId === s.scheduleId && r.status === activeTab)
    );

    if (!stillAvailable.find((s) => s.scheduleId === resolvedScheduleId)) {
      setSelectedScheduleId(stillAvailable[0]?.scheduleId ?? null);
    }
  };

  return {
    activeTab,
    selectedScheduleId: resolvedScheduleId ?? 0,
    availableSchedules,
    filtered,
    handleTabChange,
    setSelectedScheduleId,
    handleAfterStatusChange,
  };
};
