'use client';

import useIsMobile from '@/features/my-page/reservation-status/hooks/useIsMobile';
import type {
  Schedule,
  Reservation,
} from '@/features/my-page/reservation-status/types/reservation';
import ReservationPanelContent from '@/features/my-page/reservation-status/ui/ReservationPanelContent';
import useBodyScrollLock from '@/shared/ui/overlay/hooks/useBodyScrollLock';
import useEscapeKey from '@/shared/ui/overlay/hooks/useEscapeKey';
import OverlayBackdrop from '@/shared/ui/overlay/primitives/OverlayBackdrop';
import OverlayPortal from '@/shared/ui/overlay/primitives/OverlayPortal';
import OverlaySurface from '@/shared/ui/overlay/primitives/OverlaySurface';

type ReservationPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  schedules: Schedule[];
  reservations: Reservation[];
};

/**
 * 특정 날짜의 예약 목록을 슬라이드 패널로 표시하는 컴포넌트.
 *
 * - 모바일: 화면 하단에서 올라오는 바텀 시트
 * - 데스크톱: 화면 우측에서 밀려오는 사이드 패널
 *
 * 패널이 열린 동안 body 스크롤이 잠기며, Esc 키로 닫을 수 있습니다.
 * `date`가 `null`이면 아무것도 렌더링하지 않습니다.
 *
 * @example
 * ```tsx
 * <ReservationPanel
 *   isOpen={panelOpen}
 *   onClose={() => setPanelOpen(false)}
 *   date={selectedDate}
 *   schedules={schedules}
 *   reservations={reservations}
 * />
 * ```
 */

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
