import { forwardRef, useId, type ComponentProps } from 'react';
import { useFormField } from '@/shared/ui/form/FormField';
import { cn } from '@/shared/utils/cn';

export type InputProps = ComponentProps<'input'> & {
  isError?: boolean;
};

/**
 * 공통 Input 컴포넌트입니다.
 * @example
 * ```tsx
 * <Input placeholder="이메일을 입력하세요" {...register('email')} />
 * ```
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, disabled, id, ...props }, ref) => {
    // FormField가 Provider로 내려준 데이터 받아옴
    const formField = useFormField();
    const isError = props.isError ?? formField?.isError ?? false;
    const fallbackId = useId();
    const inputId = id ?? formField?.id ?? fallbackId;

    return (
      <input
        ref={ref}
        id={inputId}
        disabled={disabled}
        aria-invalid={isError}
        aria-describedby={isError ? formField?.errorId : undefined}
        className={cn(
          // 공통 뼈대
          'h-13.5 w-full rounded-2xl px-5 transition-colors outline-none',
          // 기본 상태
          'border border-gray-100 bg-white typo-16-medium text-gray-950 placeholder:text-gray-400',
          // Focus 상태
          'focus:border-[1.5px] focus:border-primary-500 focus:placeholder-transparent',
          // Disabled 상태
          'disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-25 disabled:text-gray-400',
          // Error 상태
          'aria-invalid:border-error',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
