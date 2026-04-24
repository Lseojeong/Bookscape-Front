import { useState, type ComponentProps } from 'react';
import { EyeOnIcon, EyeOffIcon } from '@/shared/assets/icons';
import Input from '@/shared/ui/input/Input';

type PasswordInputProps = Omit<ComponentProps<typeof Input>, 'type' | 'rightElement'>;

/**
 * @example
 * ```tsx
 * <PasswordInput placeholder="비밀번호를 입력해주세요" />
 * <FormField label="비밀번호" errorMessage={errors.password?.message}>
 * <PasswordInput
 * placeholder="비밀번호를 입력해주세요"
 * {...register('password')}
 * />
 * </FormField>
 * ```
 * 비밀번호 입력 전용 Input 컴포넌트입니다.
 * 내부적으로 상태를 관리하여 눈 모양 토글 아이콘을 자동 렌더링합니다.
 */
export default function PasswordInput({ className, ...props }: PasswordInputProps) {
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
