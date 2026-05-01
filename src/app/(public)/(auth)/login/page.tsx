'use client';
import { useForm } from 'react-hook-form';
import AuthFooter from '@/features/auth/ui/AuthFooter';
import Button from '@/shared/ui/button/Button';
import FormField from '@/shared/ui/form/FormField';
import FormInput from '@/shared/ui/form/FormInput';
import PasswordInput from '@/shared/ui/input/PasswordInput';

const LABEL_STYLE = 'mb-4 typo-16-medium text-gray-950 md:mb-5';

/**
 * 로그인 페이지 컴포넌트입니다.
 * 이메일과 비밀번호 입력 폼을 제공하며, react-hook-form으로 폼 상태를 관리합니다.
 * 하단에 카카오 로그인 및 회원가입 페이지 이동 링크가 포함됩니다.
 */
export default function LoginPage() {
  const { control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col">
        <FormField label="이메일" className={LABEL_STYLE}>
          <FormInput
            type="email"
            name="email"
            control={control}
            placeholder="이메일을 입력해 주세요"
          />
        </FormField>

        <FormField label="비밀번호" className={LABEL_STYLE}>
          <PasswordInput name="password" control={control} placeholder="비밀번호를 입력해 주세요" />
        </FormField>

        <Button
          theme="gray"
          size="lg"
          className="h-13.5 w-full rounded-2xl bg-gray-200 text-gray-50"
        >
          로그인 하기
        </Button>
      </div>
      <AuthFooter />
    </div>
  );
}
