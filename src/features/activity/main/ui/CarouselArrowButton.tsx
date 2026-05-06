import { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

type CarouselArrowButtonProps = {
  ariaLabel: string;
  children: ReactNode;
  className: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function CarouselArrowButton({
  ariaLabel,
  children,
  className,
  onClick,
  disabled,
}: CarouselArrowButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        // 레이아웃
        'absolute top-1/2 z-10 -translate-y-1/2',
        // 크기 & 모양
        'h-13.5 w-13.5 rounded-full',
        // 색상 & 테두리
        'border border-gray-100 bg-white',
        // 효과
        'shadow-lg transition-opacity',
        // 반응형
        'hidden items-center justify-center sm:flex',
        // 상태
        'hover:bg-gray-50',
        'disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-50 disabled:opacity-50',
        className
      )}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
