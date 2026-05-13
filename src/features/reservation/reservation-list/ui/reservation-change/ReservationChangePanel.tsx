'use client';

import type { MyReservation } from '@/features/reservation/types';
import OverlayLayer from '@/shared/ui/overlay/layer/OverlayLayer';
import ReservationChangeWidget from './ReservationChangeWidget';

type ReservationChangePanelProps = {
  isOpen: boolean;
  reservation: MyReservation;
  onClose: () => void;
};

export default function ReservationChangePanel({
  isOpen,
  reservation,
  onClose,
}: ReservationChangePanelProps) {
  return (
    <OverlayLayer
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="예약 변경"
      position="right"
      variant="panel"
      tone="surface"
      elevation="card"
      surfaceClassName="w-[520px]"
      contentClassName="h-full overflow-y-auto p-7.5"
    >
      <ReservationChangeWidget reservation={reservation} onSuccess={onClose} />
    </OverlayLayer>
  );
}
