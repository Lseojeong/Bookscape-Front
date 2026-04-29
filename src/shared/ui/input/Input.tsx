'use client';

import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

type InputProps = ComponentProps<'input'> & {
  isError?: boolean;
  rightElement?: ReactNode;
};

/**
 * 기본 Input UI 컴포넌트입니다.
 * React Hook Form 등 상태 관리 로직에 의존하지 않는 순수 UI 컴포넌트입니다.
 * 우측에 커스텀 요소(아이콘, 버튼 등)를 추가하거나 에러 상태를 시각적으로 표시할 수 있습니다.
 * * @example
 * ```tsx
 * // 기본 사용
 * <Input placeholder="이름을 입력하세요" />
 * * // 우측 커스텀 요소 및 에러 상태 적용
 * <Input
 * isError={true}
 * placeholder="비밀번호 입력"
 * rightElement={<button>보기</button>}
 * />
 * ```
 */
export default function Input({
  className,
  disabled,
  rightElement,
  isError,
  ...props
}: InputProps) {
  return (
    <div className="relative w-full">
      <input
        {...props}
        disabled={disabled}
        aria-invalid={isError || undefined}
        className={cn('input-base', rightElement && 'pr-12', className)}
      />
      {rightElement && (
        <div className="absolute top-1/2 right-5 flex -translate-y-1/2 items-center justify-center text-gray-400">
          {rightElement}
        </div>
      )}
    </div>
  );
}
