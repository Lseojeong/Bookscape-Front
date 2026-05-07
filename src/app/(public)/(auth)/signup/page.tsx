'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { signupUser } from '@/features/auth/apis';
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
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
    },
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
  });

  // 모든 필드 입력 감지
  const formValues = useWatch({ control });
  const isAllFilled = Object.values(formValues).every((value) => value?.trim() !== '');

  // 필드 순서대로 에러 노출
  const firstError =
    errors.email?.message ??
    errors.nickname?.message ??
    errors.password?.message ??
    errors.passwordConfirm?.message ??
    errors.root?.message;

  /** 회원가입 요청 핸들러 */
  const handleSignup = useCallback(
    async (formData: SignupFormValues) => {
      try {
        await signupUser(formData);

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
    <>
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
          <PasswordInput name="password" control={control} placeholder="비밀번호를 입력해 주세요" />
        </FormField>

        <FormField label="비밀번호 확인">
          <PasswordInput
            name="passwordConfirm"
            control={control}
            placeholder="비밀번호를 한 번 더 입력해 주세요"
          />
        </FormField>
        <div className="mt-1 md:mt-2">
          {/* 에러 메시지 */}
          {firstError && (
            <FormErrorMessage className="typo-13-medium">{firstError}</FormErrorMessage>
          )}

          <Button
            type="submit"
            theme="primary"
            size="lg"
            isLoading={isSubmitting}
            disabled={!isAllFilled || isSubmitting}
            className="mt-2 h-13.5 w-full rounded-2xl md:mt-2.5"
          >
            회원가입 하기
          </Button>
        </div>
      </AuthForm>
      <AuthFooter />
    </>
  );
}
