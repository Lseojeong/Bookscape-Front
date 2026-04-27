'use client';

import { cn } from '@/shared/utils/cn';

type OverlayBackdropProps = {
  /** 백드롭 클릭 시 실행할 핸들러 (미지정 시 클릭 무시) */
  onClick?: () => void;
  /** aria-label (기본값: 닫기) */
  ariaLabel?: string;
  /** 추가 클래스 */
  className?: string;
};

const overlayBackdropBase = 'absolute inset-0 layer-modal-backdrop bg-black/50';

// NOTE: OverlayBackdrop은 OverlaySurface와 함께 사용되며, 단독으로 사용되지 않습니다.

/**
 * OverlayBackdrop
 *
 * - Dialog / Panel / BottomSheet 뒤에 깔리는 dimmed 배경입니다.
 *
 * @remarks
 * - 기본 투명도는 black 50% 입니다.
 * - `onClick`이 있을 때만 클릭으로 닫기 동작을 연결합니다.
 */
export default function OverlayBackdrop({
  onClick,
  ariaLabel = '닫기',
  className,
}: OverlayBackdropProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={cn(overlayBackdropBase, className)}
      onClick={onClick}
    />
  );
}
