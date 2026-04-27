'use client';

import type { ReactNode } from 'react';
import useBodyScrollLock from '@/shared/ui/overlay/hooks/useBodyScrollLock';
import useEscapeKey from '@/shared/ui/overlay/hooks/useEscapeKey';
import OverlayBackdrop from '@/shared/ui/overlay/primitives/OverlayBackdrop';
import OverlayPortal from '@/shared/ui/overlay/primitives/OverlayPortal';
import OverlaySurface from '@/shared/ui/overlay/primitives/OverlaySurface';
import { cn } from '@/shared/utils/cn';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  surfaceClassName?: string;
  contentClassName?: string;
  backdropClassName?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  ariaLabel?: string;
};

/**
 * ## Modal
 *
 * Portal 기반 모달 컴포넌트입니다.
 *
 * @remarks
 * - `#modal-root`로 portal 렌더링합니다. (없으면 자동 생성)
 * - overlay 클릭 또는 ESC로 닫을 수 있습니다. (옵션으로 비활성화 가능)
 */
export default function Modal({
  isOpen,
  onClose,
  children,
  className,
  surfaceClassName,
  contentClassName,
  backdropClassName,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  ariaLabel = '모달',
}: ModalProps) {
  useEscapeKey({ isEnabled: isOpen && closeOnEsc, onEscape: onClose });
  useBodyScrollLock({ isLocked: isOpen });

  if (!isOpen) {
    return null;
  }

  return (
    <OverlayPortal>
      <div
        role="presentation"
        className={cn('fixed inset-0 layer-modal flex items-center justify-center', className)}
      >
        <OverlayBackdrop
          ariaLabel="닫기"
          className={cn('modal-backdrop', backdropClassName)}
          onClick={closeOnOverlayClick ? onClose : undefined}
        />

        <OverlaySurface
          position="center"
          variant="dialog"
          tone="transparent"
          elevation="none"
          className={surfaceClassName}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            className={cn('modal-surface modal-surface-animation', contentClassName)}
          >
            {children}
          </div>
        </OverlaySurface>
      </div>
    </OverlayPortal>
  );
}
