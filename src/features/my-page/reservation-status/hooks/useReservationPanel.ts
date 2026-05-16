import { useState } from 'react';
import type {
  MyActivityReservedScheduleItem,
  SellerReservationStatus,
} from '@/features/my-page/types';

export const getInitialTab = (
  schedules: MyActivityReservedScheduleItem[]
): SellerReservationStatus => {
  if (schedules.some((s) => s.count.pending > 0)) return 'pending';
  if (schedules.some((s) => s.count.confirmed > 0)) return 'confirmed';
  if (schedules.some((s) => s.count.declined > 0)) return 'declined';
  return 'pending';
};

export const useReservationPanel = (schedules: MyActivityReservedScheduleItem[]) => {
  const [manualTab, setManualTab] = useState<SellerReservationStatus | null>(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);

  // schedules 기반으로 초기 탭 자동 결정, 사용자가 직접 선택하면 그걸 우선
  const activeTab = manualTab ?? getInitialTab(schedules);

  // 현재 탭 기준 첫 번째 available 스케줄
  const firstAvailableId =
    schedules.find((s) => s.count[activeTab] > 0)?.scheduleId ?? schedules[0]?.scheduleId ?? null;
  const resolvedScheduleId = selectedScheduleId ?? firstAvailableId;

  const availableSchedules = schedules.filter((s) => s.count[activeTab] > 0);

  const handleTabChange = (id: string) => {
    const nextTab = id as SellerReservationStatus;
    setManualTab(nextTab);
    const firstAvailable = schedules.find((s) => s.count[nextTab] > 0);
    setSelectedScheduleId(firstAvailable?.scheduleId ?? null);
  };

  return {
    activeTab,
    setActiveTab: setManualTab,
    selectedScheduleId: resolvedScheduleId ?? 0,
    availableSchedules,
    handleTabChange,
    setSelectedScheduleId,
  };
};
