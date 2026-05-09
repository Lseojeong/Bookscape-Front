import { useState } from 'react';
import type {
  MyActivityReservedScheduleItem,
  MyActivityReservation,
  SellerReservationStatus,
} from '@/features/my-page/types';

export const useReservationPanel = (
  schedules: MyActivityReservedScheduleItem[],
  reservations: MyActivityReservation[]
) => {
  const [activeTab, setActiveTab] = useState<SellerReservationStatus>('pending');
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);

  // null이면 첫 번째 스케줄로 자동 선택
  const resolvedScheduleId = selectedScheduleId ?? schedules[0]?.scheduleId ?? 0;

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
    setActiveTab(nextTab);
    // null로 리셋하면 자동으로 첫 번째 스케줄 선택
    setSelectedScheduleId(firstAvailable?.scheduleId ?? null);
  };

  /**
   * 승인/거절 후 현재 스케줄에 해당 탭 예약이 없으면 다음 스케줄로 자동 이동
   *
   * @param updatedReservations - 최신 예약 목록
   */
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
    selectedScheduleId: resolvedScheduleId,
    availableSchedules,
    filtered,
    handleTabChange,
    setSelectedScheduleId,
    handleAfterStatusChange,
  };
};
