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

  return {
    activeTab,
    selectedScheduleId: resolvedScheduleId,
    availableSchedules,
    filtered,
    handleTabChange,
    setSelectedScheduleId,
  };
};
