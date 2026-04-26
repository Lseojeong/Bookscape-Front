import { ReactNode, useId, type ComponentProps } from 'react';
import { useController, UseControllerProps, FieldValues } from 'react-hook-form';
import { useFormField } from '@/shared/ui/form/FormField';
import { cn } from '@/shared/utils/cn';

export type InputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<ComponentProps<'input'>, 'name' | 'defaultValue'> & {
    isError?: boolean;
    rightElement?: ReactNode;
  };

/**
 * 공통 Input 컴포넌트입니다.
 * @example
 * ```tsx
 * <Input name="email" control={control} rules={{ required: true }} />
 * ```
 */
export default function Input<T extends FieldValues>({
  className,
  disabled,
  rightElement,
  id,
  isError: isErrorProp,
  name,
  control,
  rules,
  shouldUnregister,
  ...props
}: InputProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules, shouldUnregister });

  const formField = useFormField();
  const isError = isErrorProp || !!error || !!formField?.isError;
  const fallbackId = useId();
  const inputId = id ?? formField?.id ?? fallbackId;

  return (
    <div className="relative w-full">
      <input
        {...field}
        {...props}
        id={inputId}
        disabled={disabled}
        aria-invalid={isError}
        aria-describedby={isError ? formField?.errorId : undefined}
        className={cn(
          'h-13.5 w-full rounded-2xl px-5 transition-colors outline-none',
          'border border-gray-100 bg-white typo-16-medium text-gray-950 placeholder:text-gray-400',
          'focus:border-[1.5px] focus:border-primary-500 focus:placeholder-transparent',
          'disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-25 disabled:text-gray-400',
          'aria-invalid:border-error',
          rightElement && 'pr-12',
          className
        )}
      />
      {rightElement && (
        <div className="absolute top-1/2 right-5 flex -translate-y-1/2 items-center justify-center text-gray-400">
          {rightElement}
        </div>
      )}
    </div>
  );
}
