'use client';

import type { MyReservation } from '@/features/reservation/types';
import OverlayLayer from '@/shared/ui/overlay/layer/OverlayLayer';
import ReservationChangeContent from './ReservationChangeContent';

type ReservationChangePanelProps = {
  isOpen: boolean;
  reservation: MyReservation;
  onClose: () => void;
};

/**
 * ## ReservationChangePanel
 *
 * PC에서 사용하는 예약 변경 오른쪽 패널 컨테이너입니다.
 *
 * @remarks
 * - Overlay 레이아웃(오른쪽 패널)만 담당하고, 실제 콘텐츠는 `ReservationChangeContent`에서 렌더링합니다.
 */
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
      <ReservationChangeContent variant="panel" reservation={reservation} onClose={onClose} />
    </OverlayLayer>
  );
}
