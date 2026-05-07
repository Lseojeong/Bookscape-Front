'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { loginUser } from '@/features/auth/apis';
import { AUTH_API_MESSAGE } from '@/features/auth/constants/authMessage';
import AuthFooter from '@/features/auth/ui/AuthFooter';
import AuthForm from '@/features/auth/ui/AuthForm';
import { LoginFormValues, loginSchema } from '@/features/auth/utils/schema';
import { ApiError } from '@/shared/apis/apiError';
import { useAuthStore } from '@/shared/stores/useAuthStore';
import Button from '@/shared/ui/button/Button';
import FormErrorMessage from '@/shared/ui/form/FormErrorMessage';
import FormField from '@/shared/ui/form/FormField';
import FormInput from '@/shared/ui/form/FormInput';
import PasswordInput from '@/shared/ui/input/PasswordInput';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';
import { cn } from '@/shared/utils/cn';

/**
 * 로그인 페이지 컴포넌트입니다.
 * 이메일과 비밀번호를 통한 인증을 처리합니다.
 * 성공 시 유저 정보를 Zustand 스토어에 저장하고 메인 페이지로 이동합니다.
 */
export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const { showToast } = useToastStore();
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  // 모든 필드 입력 감지
  const formValues = useWatch({ control });
  const isAllFilled = Object.values(formValues).every((value) => value.trim() !== '');

  // 필드 순서대로 에러 노출
  const firstError = errors.email?.message ?? errors.password?.message ?? errors.root?.message;

  /** 로그인 요청 핸들러 */
  const handleLogin = useCallback(
    async (formData: LoginFormValues) => {
      try {
        const response = await loginUser(formData);

        if (response) {
          const { user, expiresAt } = response;

          // 전역 상태(Zustand) 업데이트
          setAuth(
            {
              id: user.id,
              email: user.email,
              nickname: user.nickname,
            },
            expiresAt
          );

          // 로그인 성공 토스트
          showToast('check', AUTH_API_MESSAGE.LOGIN.SUCCESS);

          // 쿠키 상태 동기화를 위해 refresh 후 이동
          router.refresh();
          router.push('/');
        }
      } catch (error) {
        if (error instanceof ApiError) {
          // 서버에서 내려온 에러 (401, 400 등)
          setError('root', {
            type: 'server',
            message: error.message,
          });
        } else {
          // 네트워크 에러 등
          showToast('cancel', '로그인 중 오류가 발생했습니다.');
        }
      }
    },
    [router, setAuth, setError, showToast]
  );

  return (
    <>
      <AuthForm onSubmit={handleSubmit(handleLogin)}>
        <FormField label="이메일">
          <FormInput
            type="email"
            name="email"
            control={control}
            placeholder="이메일을 입력해 주세요"
          />
        </FormField>

        <FormField label="비밀번호">
          <PasswordInput name="password" control={control} placeholder="비밀번호를 입력해 주세요" />
        </FormField>
        <div className="mt-1 md:mt-2">
          {/* API 에러 메시지 */}
          {firstError && (
            <FormErrorMessage className="typo-13-medium">{firstError}</FormErrorMessage>
          )}

          <Button
            type="submit"
            theme="primary"
            size="lg"
            isLoading={isSubmitting}
            disabled={!isAllFilled || isSubmitting}
            className={cn('mt-1 h-13.5 w-full rounded-2xl', !errors.root && 'md:mt-2')}
          >
            로그인 하기
          </Button>
        </div>
      </AuthForm>
      <AuthFooter />
    </>
  );
}
