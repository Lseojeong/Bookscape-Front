'use client';

import { cva } from 'class-variance-authority';
import type { ElementType, MouseEvent } from 'react';
import type { PolymorphicButtonProps } from '@/shared/ui/button/types';
import Loading from '@/shared/ui/loading/Loading';
import { cn } from '@/shared/utils/cn';

const buttonStyle = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap rounded-[14px] border transition-colors cursor-pointer aria-disabled:cursor-not-allowed',
  {
    variants: {
      theme: {
        primary:
          'border-transparent bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 aria-disabled:bg-gray-200 aria-disabled:text-gray-50 aria-disabled:hover:bg-gray-200 aria-disabled:active:bg-gray-200',
        secondary:
          'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 active:bg-gray-100aria-disabled:bg-white aria-disabled:border-gray-200 aria-disabled:text-gray-300 aria-disabled:hover:bg-white aria-disabled:active:bg-white',
        gray: 'border-transparent bg-gray-50 text-gray-600 hover:bg-gray-100 active:bg-gray-200 aria-disabled:bg-gray-200 aria-disabled:text-gray-50 aria-disabled:hover:bg-gray-200 aria-disabled:active:bg-gray-200',
      },
      size: {
        lg: 'h-12.5 w-81.25 typo-16-bold',
        md: 'h-10.25 w-30 typo-14-bold',
        sm: 'h-7.25 w-23.5 typo-14-medium',
        icon: 'h-10.5 w-10.5 rounded-[30px] p-0',
      },
    },
    defaultVariants: {
      theme: 'primary',
      size: 'md',
    },
  }
);

const loadingSizeMap = {
  lg: 20,
  md: 16,
  sm: 14,
  icon: 14,
} as const;

const loadingColorMap = {
  primary: 'white',
  secondary: 'var(--color-gray-600)',
  gray: 'var(--color-gray-600)',
} as const;

/**
 * 다형성을 지원하는 공통 버튼 컴포넌트입니다.
 * @example
 * // 일반 버튼 사용
 * <Button theme="primary" size="lg" onClick={handleClick}>저장하기</Button>
 * @example
 * // Next.js Link 버튼으로 사용 (className 덮어쓰기)
 * <Button as={Link} href="/reservation" className="w-full">예약하기</Button>
 */

export default function Button<T extends ElementType = 'button'>({
  as,
  children,
  theme = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  isLoading = false,
  className,
  onClick,
  ...props
}: PolymorphicButtonProps<T>) {
  const Component = as || 'button';
  const isButtonElement = Component === 'button';
  const isDisabled = disabled || isLoading;

  // NOTE: disabled 상태일 때 강제로 onClick 이벤트가 발생하는 것을 브라우저 단에서 차단
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <Component
      aria-disabled={isDisabled}
      aria-busy={isLoading || undefined}
      className={cn(buttonStyle({ theme, size }), className)}
      onClick={handleClick}
      {...(isButtonElement
        ? { type, disabled: isDisabled }
        : { tabIndex: isDisabled ? -1 : undefined })}
      {...props}
    >
      <span className={cn(isLoading && 'opacity-0')}>{children}</span>
      {isLoading && (
        <span className="absolute inset-0 inline-flex items-center justify-center">
          <Loading size={loadingSizeMap[size]} color={loadingColorMap[theme]} />
        </span>
      )}
    </Component>
  );
}
