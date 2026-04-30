'use client';

import type { ComponentProps } from 'react';
import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form';
import { useFormField } from '@/shared/ui/form/FormField';
import Textarea from '@/shared/ui/textarea/Textarea';

export type FormTextareaProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<ComponentProps<typeof Textarea>, 'name' | 'defaultValue'> & {
    isError?: boolean;
  };

/**
 * React Hook Form과 연동되어 폼 상태를 관리하는 Textarea Wrapper 컴포넌트입니다.
 * 내부적으로 FormField Context를 참조하여 에러 상태와 접근성 속성을 자동으로 주입합니다.
 * * @example
 * ```tsx
 * <FormField label="상세 설명" errorMessage={errors.description?.message}>
 * <FormTextarea
 * name="description"
 * control={control}
 * variant="activity"
 * maxLength={1000}
 * />
 * </FormField>
 * ```
 */
export default function FormTextarea<T extends FieldValues>({
  name,
  control,
  rules,
  shouldUnregister,
  isError: isErrorProp,
  id,
  ...props
}: FormTextareaProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules, shouldUnregister });

  const formField = useFormField();

  // NOTE: 에러 상태 결정 우선순위: 명시적 prop 주입 > react-hook-form 필드 에러 > formField.isError: FormField Context 부모 에러
  const isError = isErrorProp ?? (!!error || !!formField?.isError);
  const textareaId = id ?? formField?.id;
  const describedBy = isError ? formField?.errorId : undefined;

  return (
    <Textarea
      {...props}
      {...field}
      id={textareaId}
      isError={isError}
      aria-describedby={describedBy}
    />
  );
}
