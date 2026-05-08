'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { signupUser } from '@/features/auth/apis/auth';
import { AUTH_API_MESSAGE } from '@/features/auth/constants/authMessage';
import AuthFooter from '@/features/auth/ui/AuthFooter';
import AuthForm from '@/features/auth/ui/AuthForm';
import { SignupFormValues, signupSchema } from '@/features/auth/utils/schema';
import { ApiError } from '@/shared/apis/apiError';
import Button from '@/shared/ui/button/Button';
import FormErrorMessage from '@/shared/ui/form/FormErrorMessage';
import FormField from '@/shared/ui/form/FormField';
import FormInput from '@/shared/ui/form/FormInput';
import PasswordInput from '@/shared/ui/input/PasswordInput';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

/**
 * 회원가입 페이지 컴포넌트입니다.
 * 이메일, 닉네임, 비밀번호, 비밀번호 확인 입력 폼을 제공하며, react-hook-form으로 폼 상태를 관리합니다.
 * 하단에 카카오 회원가입 및 로그인 페이지 이동 링크가 포함됩니다.
 */
export default function SignupPage() {
  const router = useRouter();
  const { showToast } = useToastStore();
  const methods = useForm({
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(signupSchema),
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isDirty },
  } = methods;

  /** 회원가입 요청 핸들러 */
  const handleSignup = useCallback(
    async (formData: SignupFormValues) => {
      try {
        const { passwordConfirm: _, ...signupData } = formData;
        await signupUser(signupData);

        // 회원가입 성공 토스트
        showToast('check', AUTH_API_MESSAGE.SIGNUP.SUCCESS);

        // 로그인 페이지로 이동
        router.push('/login');
      } catch (error) {
        if (error instanceof ApiError) {
          // 서버에서 내려온 에러 (409 이메일 중복 등)
          setError('root', {
            type: 'server',
            message: error.message,
          });
        } else {
          // 네트워크 에러 등
          showToast('cancel', '회원가입 중 오류가 발생했습니다.');
        }
      }
    },
    [router, setError, showToast]
  );

  return (
    <FormProvider {...methods}>
      <AuthForm onSubmit={handleSubmit(handleSignup)}>
        <FormField label="이메일" errorMessage={errors.email?.message}>
          <FormInput
            type="email"
            name="email"
            control={control}
            placeholder="이메일을 입력해 주세요"
          />
        </FormField>

        <FormField label="닉네임" errorMessage={errors.nickname?.message}>
          <FormInput
            type="text"
            name="nickname"
            control={control}
            placeholder="닉네임을 입력해 주세요"
          />
        </FormField>

        <FormField label="비밀번호" errorMessage={errors.password?.message}>
          <PasswordInput name="password" control={control} placeholder="비밀번호를 입력해 주세요" />
        </FormField>

        <FormField label="비밀번호 확인" errorMessage={errors.passwordConfirm?.message}>
          <PasswordInput
            name="passwordConfirm"
            control={control}
            placeholder="비밀번호를 한 번 더 입력해 주세요"
          />
        </FormField>
        <div className="mt-1 md:mt-2">
          {/* 백엔드 에러 메시지 */}
          {errors.root && (
            <FormErrorMessage className="typo-13-medium">{errors.root.message}</FormErrorMessage>
          )}

          <Button
            type="submit"
            theme="primary"
            size="lg"
            isLoading={isSubmitting}
            disabled={!isDirty || isSubmitting}
            className="mt-2 h-13.5 w-full rounded-2xl md:mt-2.5"
          >
            회원가입 하기
          </Button>
        </div>
      </AuthForm>
      <AuthFooter />
    </FormProvider>
  );
}
