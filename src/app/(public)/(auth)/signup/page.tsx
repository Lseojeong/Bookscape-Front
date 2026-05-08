'use client';
import { useForm } from 'react-hook-form';
import AuthHeadline from '@/app/(public)/(auth)/ui/AuthHeadline';
import AuthFooter from '@/features/auth/ui/AuthFooter';
import AuthForm from '@/features/auth/ui/AuthForm';
import Button from '@/shared/ui/button/Button';
import FormField from '@/shared/ui/form/FormField';
import FormInput from '@/shared/ui/form/FormInput';
import PasswordInput from '@/shared/ui/input/PasswordInput';

/**
 * 회원가입 페이지 컴포넌트입니다.
 * 이메일, 닉네임, 비밀번호, 비밀번호 확인 입력 폼을 제공하며, react-hook-form으로 폼 상태를 관리합니다.
 * 하단에 카카오 회원가입 및 로그인 페이지 이동 링크가 포함됩니다.
 */
export default function SignupPage() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const handleSignup = () => {};

  return (
    <div className="py-20">
      <AuthHeadline />
      <div className="mt-17 md:mt-22">
        <AuthForm onSubmit={handleSubmit(handleSignup)}>
          <FormField label="이메일">
            <FormInput
              type="email"
              name="email"
              control={control}
              placeholder="이메일을 입력해 주세요"
            />
          </FormField>

          <FormField label="닉네임">
            <FormInput
              type="text"
              name="nickname"
              control={control}
              placeholder="닉네임을 입력해 주세요"
            />
          </FormField>

          <FormField label="비밀번호">
            <PasswordInput
              name="password"
              control={control}
              placeholder="비밀번호를 입력해 주세요"
            />
          </FormField>

          <FormField label="비밀번호 확인">
            <PasswordInput
              name="passwordConfirm"
              control={control}
              placeholder="비밀번호를 한 번 더 입력해 주세요"
            />
          </FormField>
          <Button
            type="submit"
            theme="primary"
            size="lg"
            isLoading={isSubmitting}
            disabled={!isValid || isSubmitting}
            className="mt-2 h-13.5 w-full rounded-2xl md:mt-2.5"
          >
            회원가입 하기
          </Button>
        </AuthForm>
        <AuthFooter />
      </div>
    </div>
  );
}
