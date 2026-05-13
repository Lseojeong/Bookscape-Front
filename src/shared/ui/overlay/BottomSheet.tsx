'use client';

import { useRef, useState, type ReactNode } from 'react';
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
  /** OverlaySurface에 전달할 추가 className (max-h 등 크기 조정 시 사용) */
  surfaceClassName?: string;
  surfaceStyle?: React.CSSProperties;
  className?: string;
};

/**
 * 모바일 하단에서 올라오는 바텀시트 공통 컴포넌트입니다.
 *
 * - OverlaySurface `position="bottom" variant="sheet"` 기반
 * - 핸들바를 아래로 100px 이상 드래그하면 닫힙니다.
 * - ESC 키, 백드롭 클릭으로도 닫을 수 있습니다.
 *
 * @example
 * ```tsx
 * <BottomSheet isOpen={isOpen} onClose={onClose} ariaLabel="예약 날짜 선택">
 *   <div className="px-6">콘텐츠</div>
 * </BottomSheet>
 * ```
 */
export default function BottomSheet({
  isOpen,
  onClose,
  children,
  ariaLabel = '바텀시트',
  surfaceClassName,
  surfaceStyle,
  className,
}: BottomSheetProps) {
  const startYRef = useRef<number>(0);
  const [dragY, setDragY] = useState(0);
  const handleClose = () => {
    setDragY(0);
    onClose();
  };

  useBodyScrollLock({ isLocked: isOpen });
  useEscapeKey({ isEnabled: isOpen, onEscape: handleClose });

  const handleTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const diff = e.touches[0].clientY - startYRef.current;
    if (diff > 0) setDragY(diff);
  };

  const handleTouchEnd = () => {
    if (dragY > 100) handleClose();
    else setDragY(0);
  };

  if (!isOpen) return null;

  return (
    <OverlayPortal>
      <div className={cn('fixed inset-0 layer-modal', className)}>
        <OverlayBackdrop onClick={handleClose} ariaLabel="닫기" />
        <OverlaySurface
          position="bottom"
          variant="sheet"
          tone="surface"
          elevation="card"
          className={cn('h-auto!', surfaceClassName)}
          style={{
            transform: `translateY(${dragY}px)`,
            transition: dragY === 0 ? 'transform 0.3s ease' : 'none',
            ...surfaceStyle,
          }}
        >
          <div role="dialog" aria-modal="true" aria-label={ariaLabel} className="flex flex-col">
            {/* 핸들바 — 드래그 영역 */}
            <div
              className="flex shrink-0 justify-center pt-4 pb-3"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="h-1 w-19 rounded-full bg-gray-300" />
            </div>
            {/* 콘텐츠 */}
            <div className="flex flex-col overflow-y-auto">{children}</div>
          </div>
        </OverlaySurface>
      </div>
    </OverlayPortal>
  );
}
