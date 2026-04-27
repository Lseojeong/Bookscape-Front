'use client';

import { cn } from '@/shared/utils/cn';

type BackdropProps = {
  /** 백드롭 클릭 시 실행할 핸들러 (미지정 시 클릭 무시) */
  onClick?: () => void;
  /** aria-label (기본값: 닫기) */
  ariaLabel?: string;
  /** 추가 클래스 */
  className?: string;
};

const backdropBase = 'absolute inset-0 layer-modal-backdrop bg-black/50';

/**
 * Backdrop
 *
 * 모달 뒤에 깔리는 백드롭(딤) 컴포넌트입니다.
 *
 * @remarks
 * - 기본 투명도는 black 50% 입니다.
 * - `onClick`이 있을 때만 클릭으로 닫기 동작을 연결합니다.
 */
export default function Backdrop({ onClick, ariaLabel = '닫기', className }: BackdropProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={cn(backdropBase, className)}
      onClick={onClick}
    />
  );
}
