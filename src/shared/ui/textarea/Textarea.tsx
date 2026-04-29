'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { useState, type ChangeEvent, type ComponentProps, type Ref } from 'react';
import { cn } from '@/shared/utils/cn';

// NOTE: 스크롤바를 패딩 안쪽에 위치시키기 위해 textarea가 아닌 wrapper에 border와 padding을 적용
const containerVariants = cva(
  'flex w-full flex-col bg-white border border-gray-100 transition-colors focus-within:border-[1.5px] focus-within:border-primary-500',
  {
    variants: {
      variant: {
        review: 'h-44.75 rounded-xl px-5 py-5',
        activity: 'h-35 rounded-2xl px-5 py-4 md:h-50',
      },
    },
    defaultVariants: {
      variant: 'activity',
    },
  }
);

type TextareaProps = ComponentProps<'textarea'> &
  VariantProps<typeof containerVariants> & {
    ref?: Ref<HTMLTextAreaElement>;
    maxLength?: number;
    isError?: boolean;
    wrapperClassName?: string;
  };

/**
 * 다중 행 텍스트 입력을 위한 순수 UI Textarea 컴포넌트입니다.
 * `maxLength` 속성을 전달하면 우측 하단에 글자 수 카운터가 표시됩니다.
 * @example
 * ```tsx
 * <Textarea variant="review" maxLength={500} placeholder="리뷰를 작성해주세요." />
 * ```
 */
export default function Textarea({
  variant,
  maxLength,
  isError,
  className,
  wrapperClassName,
  onChange,
  value,
  defaultValue,
  ref,
  ...props
}: TextareaProps) {
  // 제어 컴포넌트 여부 확인 및 상태 분리
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(String(defaultValue ?? ''));
  const currentText = isControlled ? String(value) : internalValue;
  const charCount = currentText.length;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    if (maxLength !== undefined && newValue.length > maxLength) {
      return;
    }

    // 비제어 컴포넌트일 때만 내부 상태 업데이트
    if (!isControlled) {
      setInternalValue(newValue);
    }

    if (onChange) {
      onChange(e);
    }
  };

  const hasCounter = maxLength !== undefined && maxLength > 0;

  return (
    <div className={cn('w-full', wrapperClassName)}>
      <div
        className={cn(
          'relative',
          containerVariants({ variant }),
          isError && 'border-error focus-within:border-error'
        )}
      >
        <textarea
          ref={ref}
          maxLength={maxLength}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          onChange={handleChange}
          aria-invalid={isError}
          className={cn(
            'h-full w-full resize-none bg-transparent text-gray-950 outline-none placeholder:text-gray-400',
            'typo-14-medium md:typo-16-medium',
            'scrollbar-mini',
            className
          )}
          {...props}
        />

        {hasCounter && (
          <div
            aria-hidden="true"
            className="absolute right-5 bottom-0 flex h-5 items-center justify-end text-right typo-13-medium text-gray-600 md:typo-14-medium"
          >
            {charCount}/{maxLength}
          </div>
        )}
      </div>
    </div>
  );
}
