'use client';

import type { ComponentProps, ReactNode } from 'react';
import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form';
import { useFormField } from '@/shared/ui/form/FormField';
import Input from '@/shared/ui/input/Input';

export type FormInputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<ComponentProps<'input'>, 'name' | 'defaultValue'> & {
    isError?: boolean;
    rightElement?: ReactNode;
  };

/**
 * React Hook Form과 연동되어 폼 상태를 관리하는 Input Wrapper 컴포넌트입니다.
 * 내부적으로 FormField Context를 참조하여 에러 상태와 접근성 속성을 자동으로 주입합니다.
 * * @example
 * ```tsx
 * <FormField label="이메일" errorMessage={errors.email?.message}>
 * <FormInput name="email" control={control} placeholder="이메일 입력" />
 * </FormField>
 * ```
 */
export default function FormInput<T extends FieldValues>({
  name,
  control,
  rules,
  shouldUnregister,
  isError: isErrorProp,
  id,
  ...props
}: FormInputProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules, shouldUnregister });

  const formField = useFormField();
  // NOTE: 에러 상태 결정 우선순위: 명시적 prop 주입 > react-hook-form 필드 에러 > FormField Context 부모 에러
  const isError = isErrorProp ?? (!!error || !!formField?.isError);
  const inputId = id ?? formField?.id;
  const describedBy = isError ? formField?.errorId : undefined;

  return (
    <Input {...props} {...field} id={inputId} isError={isError} aria-describedby={describedBy} />
  );
}
