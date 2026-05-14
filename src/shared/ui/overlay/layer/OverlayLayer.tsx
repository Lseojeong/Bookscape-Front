'use client';

import type { ReactNode } from 'react';
import useBodyScrollLock from '@/shared/ui/overlay/hooks/useBodyScrollLock';
import useEscapeKey from '@/shared/ui/overlay/hooks/useEscapeKey';
import OverlayBackdrop from '@/shared/ui/overlay/primitives/OverlayBackdrop';
import OverlayPortal from '@/shared/ui/overlay/primitives/OverlayPortal';
import OverlaySurface from '@/shared/ui/overlay/primitives/OverlaySurface';
import type { OverlaySurfaceProps } from '@/shared/ui/overlay/primitives/OverlaySurface';
import { cn } from '@/shared/utils/cn';

type OverlayLayerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: OverlaySurfaceProps['position'];
  variant?: OverlaySurfaceProps['variant'];
  tone?: OverlaySurfaceProps['tone'];
  elevation?: OverlaySurfaceProps['elevation'];
  className?: string;
  surfaceClassName?: string;
  surfaceStyle?: React.CSSProperties;
  contentClassName?: string;
  backdropClassName?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  ariaLabel?: string;
};

/**
 * ## OverlayLayer
 *
 * Portal, Backdrop, Surface, ESC 처리, body scroll lock을 조합하는 overlay layer 컴포넌트입니다.
 *
 * @remarks
 * - `#modal-root`로 portal 렌더링합니다. (없으면 자동 생성)
 * - overlay 클릭 또는 ESC로 닫을 수 있습니다. (옵션으로 비활성화 가능)
 * - `position`과 `variant`로 Dialog, BottomSheet, Panel 형태를 구성할 수 있습니다.
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <OverlayLayer
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   ariaLabel="예약 취소 확인"
 *   position="center"
 *   variant="dialog"
 *   surfaceClassName="w-80 md:w-100"
 *   contentClassName="rounded-[30px]"
 * >
 *   <div>Overlay Content</div>
 * </OverlayLayer>
 * ```
 */
export default function OverlayLayer({
  isOpen,
  onClose,
  children,
  position = 'center',
  variant = 'dialog',
  tone = 'transparent',
  elevation = 'none',
  className,
  surfaceClassName,
  surfaceStyle,
  contentClassName,
  backdropClassName,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  ariaLabel = '모달',
}: OverlayLayerProps) {
  useEscapeKey({ isEnabled: isOpen && closeOnEsc, onEscape: onClose });
  useBodyScrollLock({ isLocked: isOpen });

  if (!isOpen) {
    return null;
  }

  const surfaceBaseClassName =
    position === 'right' && variant === 'panel' ? 'overlay-surface-panel' : 'overlay-surface';

  return (
    <OverlayPortal>
      <div
        role="presentation"
        className={cn('fixed inset-0 layer-modal flex items-center justify-center', className)}
      >
        <OverlayBackdrop
          ariaLabel="닫기"
          className={cn('overlay-backdrop', backdropClassName)}
          onClick={closeOnOverlayClick ? onClose : undefined}
        />

        <OverlaySurface
          position={position}
          variant={variant}
          tone={tone}
          elevation={elevation}
          className={surfaceClassName}
          style={surfaceStyle}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            className={cn(surfaceBaseClassName, contentClassName)}
          >
            {children}
          </div>
        </OverlaySurface>
      </div>
    </OverlayPortal>
  );
}
