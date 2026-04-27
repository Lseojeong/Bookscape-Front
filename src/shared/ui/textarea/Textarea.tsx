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

// TODO: 폼 로직 PR 머지 후, UseControllerProps를 확장하여 react-hook-form(useController) 및 FormFieldContext 연동 방식으로 리팩토링 필요.
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
  const [internalValue, setInternalValue] = useState(String(value ?? defaultValue ?? ''));
  const currentText = value !== undefined ? String(value) : internalValue;
  const charCount = currentText.length;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let newValue = e.target.value;

    if (maxLength !== undefined && newValue.length > maxLength) {
      newValue = newValue.slice(0, maxLength);
      e.target.value = newValue;
    }

    setInternalValue(newValue);

    if (onChange) {
      onChange(e);
    }
  };

  const hasCounter = maxLength !== undefined && maxLength > 0;

  return (
    <div className={cn('flex w-full flex-col', wrapperClassName)}>
      <div
        className={cn(
          containerVariants({ variant }),
          isError && 'border-error focus-within:border-error'
        )}
      >
        <textarea
          ref={ref}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          aria-invalid={isError}
          className={cn(
            'h-full w-full resize-none bg-transparent text-gray-950 outline-none placeholder:text-gray-400',
            'typo-14-medium md:typo-16-medium',
            // 스크롤바 커스텀
            '[&::-webkit-scrollbar]:w-0.75',
            '[&::-webkit-scrollbar-track]:bg-transparent',
            '[&::-webkit-scrollbar-thumb]:rounded-xs [&::-webkit-scrollbar-thumb]:bg-gray-200',
            className
          )}
          {...props}
        />
      </div>

      {hasCounter && (
        <div aria-hidden="true" className="mt-2 text-right typo-14-medium text-gray-600">
          {charCount}/{maxLength}
        </div>
      )}
    </div>
  );
}
