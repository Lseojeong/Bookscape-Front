'use client';

import type { ReactNode } from 'react';
import useBottomSheetDrag from '@/shared/ui/bottom-sheet/hooks/useBottomSheetDrag';
import useBodyScrollLock from '@/shared/ui/overlay/hooks/useBodyScrollLock';
import useEscapeKey from '@/shared/ui/overlay/hooks/useEscapeKey';
import OverlayBackdrop from '@/shared/ui/overlay/primitives/OverlayBackdrop';
import OverlayPortal from '@/shared/ui/overlay/primitives/OverlayPortal';
import OverlaySurface from '@/shared/ui/overlay/primitives/OverlaySurface';
import { cn } from '@/shared/utils/cn';

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel?: string;
  surfaceClassName?: string;
  surfaceStyle?: React.CSSProperties;
  className?: string;
};

export default function BottomSheet({
  isOpen,
  onClose,
  children,
  ariaLabel = '바텀시트',
  surfaceClassName,
  surfaceStyle,
  className,
}: BottomSheetProps) {
  useBodyScrollLock({ isLocked: isOpen });
  useEscapeKey({ isEnabled: isOpen, onEscape: onClose });

  const { dragY, handlers } = useBottomSheetDrag({
    onClose,
  });

  if (!isOpen) return null;

  return (
    <OverlayPortal>
      <div className={cn('fixed inset-0 layer-modal', className)}>
        <OverlayBackdrop onClick={onClose} ariaLabel="닫기" />

        <OverlaySurface
          position="bottom"
          variant="sheet"
          tone="surface"
          elevation="card"
          className={cn('h-auto max-h-[90dvh] overflow-hidden', surfaceClassName)}
          style={{
            transform: `translateY(${dragY}px)`,
            transition: dragY === 0 ? 'transform 0.3s ease' : 'none',
            ...surfaceStyle,
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            className="flex max-h-[90dvh] flex-col"
          >
            {/* 핸들바 */}
            <div className="flex shrink-0 justify-center pt-4 pb-3" {...handlers}>
              <div className="h-1 w-19 rounded-full bg-gray-300" />
            </div>

            {/* 콘텐츠 */}
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">{children}</div>
          </div>
        </OverlaySurface>
      </div>
    </OverlayPortal>
  );
}
