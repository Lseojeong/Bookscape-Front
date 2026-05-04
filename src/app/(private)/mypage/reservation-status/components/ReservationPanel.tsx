'use client';

import useBodyScrollLock from '@/shared/ui/overlay/hooks/useBodyScrollLock';
import useEscapeKey from '@/shared/ui/overlay/hooks/useEscapeKey';
import OverlayBackdrop from '@/shared/ui/overlay/primitives/OverlayBackdrop';
import OverlayPortal from '@/shared/ui/overlay/primitives/OverlayPortal';
import OverlaySurface from '@/shared/ui/overlay/primitives/OverlaySurface';
import useIsMobile from '../hooks/useIsMobile';
import type { Schedule, Reservation } from '../types/reservation';
import ReservationPanelContent from './ReservationPanelContent';

type ReservationPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  schedules: Schedule[];
  reservations: Reservation[];
};

export default function ReservationPanel({
  isOpen,
  onClose,
  date,
  schedules,
  reservations,
}: ReservationPanelProps) {
  const isMobile = useIsMobile();

  useBodyScrollLock({ isLocked: isOpen });
  useEscapeKey({ isEnabled: isOpen, onEscape: onClose });

  if (!date) return null;

  return (
    <OverlayPortal>
      {/* 백드롭 */}
      <div
        className={`fixed inset-0 layer-modal transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <OverlayBackdrop onClick={onClose} ariaLabel="닫기" />
      </div>

      {/* 패널 */}
      <OverlaySurface
        position={isMobile ? 'bottom' : 'right'}
        variant={isMobile ? 'sheet' : 'panel'}
        tone="surface"
        elevation="card"
        className={`transition-transform duration-300 ease-in-out ${
          isOpen
            ? 'translate-x-0 translate-y-0'
            : isMobile
              ? 'translate-y-full'
              : 'translate-x-full'
        }`}
      >
        <ReservationPanelContent
          date={date}
          schedules={schedules}
          reservations={reservations}
          onClose={onClose}
        />
      </OverlaySurface>
    </OverlayPortal>
  );
}
