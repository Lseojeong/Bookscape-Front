import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { EyeOnIcon, EyeOffIcon } from '@/shared/assets/icons';
import Input, { InputProps } from '@/shared/ui/input/Input';

type PasswordInputProps<T extends FieldValues> = Omit<InputProps<T>, 'type' | 'rightElement'>;

export default function PasswordInput<T extends FieldValues>({
  className,
  ...props
}: PasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
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
