'use client';

import { useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import { EyeOnIcon, EyeOffIcon } from '@/shared/assets/icons';
import FormInput, { type FormInputProps } from '@/shared/ui/form/FormInput';

type PasswordInputProps<T extends FieldValues> = Omit<FormInputProps<T>, 'type' | 'rightElement'>;

/**
 * 비밀번호 입력을 위한 전용 컴포넌트입니다.
 * 우측의 눈알 아이콘을 통해 입력된 비밀번호의 마스킹 상태(보기/숨기기)를 토글할 수 있습니다.
 * * @example
 * ```tsx
 * <FormField label="비밀번호" errorMessage={errors.password?.message}>
 * <PasswordInput name="password" control={control} placeholder="비밀번호를 입력하세요" />
 * </FormField>
 * ```
 */
export default function PasswordInput<T extends FieldValues>({
  className,
  ...props
}: PasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormInput
      {...props}
      type={showPassword ? 'text' : 'password'}
      className={className}
      rightElement={
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
          className="flex items-center justify-center text-gray-400 transition-colors hover:text-gray-600"
        >
          {showPassword ? <EyeOnIcon /> : <EyeOffIcon />}
        </button>
      }
    />
  );
}
