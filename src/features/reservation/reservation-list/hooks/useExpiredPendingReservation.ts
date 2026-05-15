'use client';

import { useMemo } from 'react';
import type { MyReservationStatus } from '@/features/reservation/types';

type Params = {
  status: MyReservationStatus;
  date: string;
  startTime: string;
};

export const useExpiredPendingReservation = ({ status, date, startTime }: Params) => {
  return useMemo(() => {
    if (status !== 'pending') return false;
    const startAt = new Date(`${date}T${startTime}:00`);
    if (Number.isNaN(startAt.getTime())) return false;
    return startAt.getTime() < new Date().getTime();
  }, [status, date, startTime]);
};
