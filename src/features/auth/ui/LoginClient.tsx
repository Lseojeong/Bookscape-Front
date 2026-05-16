'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '@/features/auth/apis/auth';
import { AUTH_API_MESSAGE } from '@/features/auth/constants/authMessage';
import AuthFooter from '@/features/auth/ui/AuthFooter';
import AuthForm from '@/features/auth/ui/AuthForm';
import { LoginFormValues, loginSchema } from '@/features/auth/utils/schema';
import { ApiError } from '@/shared/apis/apiError';
import { useUserStore } from '@/shared/stores/userStore';
import Button from '@/shared/ui/button/Button';
import FormErrorMessage from '@/shared/ui/form/FormErrorMessage';
import FormField from '@/shared/ui/form/FormField';
import FormInput from '@/shared/ui/form/FormInput';
import PasswordInput from '@/shared/ui/input/PasswordInput';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';
import { cn } from '@/shared/utils/cn';
import { removeDotSuffix } from '@/shared/utils/stringFormat';

const AUTH_CLIENT_MESSAGE = '이메일 또는 비밀번호를 확인해 주세요';
/**
 * 이메일과 비밀번호를 통한 인증을 처리합니다.
 * 성공 시 유저 정보를 Zustand 스토어에 저장하고 메인 페이지로 이동합니다.
 *
 * @example
 * ```tsx
 * <LoginClient />
 * ```
 */
export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setSession = useUserStore((state) => state.setSession);
  const { showToast } = useToastStore();
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(loginSchema),
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, isDirty, errors },
  } = methods;

  /** 로그인 요청 핸들러 */
  const handleLogin = useCallback(
    async (formData: LoginFormValues) => {
      try {
        const response = await loginUser(formData);

        if (response) {
          const { user, accessTokenExpiresAt } = response;
          setSession({ user, accessTokenExpiresAt });

          // 로그인 성공 토스트
          showToast('check', AUTH_API_MESSAGE.LOGIN.SUCCESS);

          // 쿠키 상태 동기화를 위해 refresh 후 이동
          router.refresh();
          const redirect = searchParams.get('redirect');
          const safeRedirect =
            redirect && redirect.startsWith('/') && !redirect.startsWith('//') ? redirect : '/';
          router.push(safeRedirect);
        }
      } catch (error) {
        if (error instanceof ApiError) {
          // 404는 서버 메시지, 그 외 에러는 고정 메시지 사용
          const message =
            error.status === 404 ? removeDotSuffix(error.message) : AUTH_CLIENT_MESSAGE;

          setError('root', {
            type: 'server',
            message,
          });
        } else {
          // 네트워크 에러 등
          showToast('cancel', '로그인 중 오류가 발생했습니다.');
        }
      }
    },
    [router, searchParams, setError, setSession, showToast]
  );

  return (
    <>
      <div className="mt-17 md:mt-22">
        <AuthForm onSubmit={handleSubmit(handleLogin)}>
          <FormField label="이메일" errorMessage={errors.email?.message}>
            <FormInput
              type="email"
              name="email"
              control={control}
              placeholder="이메일을 입력해 주세요"
            />
          </FormField>

          <FormField label="비밀번호" errorMessage={errors.password?.message}>
            <PasswordInput
              name="password"
              control={control}
              placeholder="비밀번호를 입력해 주세요"
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
              className={cn('mt-1 h-13.5 w-full rounded-2xl', !errors.root && 'md:mt-2')}
            >
              로그인 하기
            </Button>
          </div>
        </AuthForm>
        <AuthFooter />
      </div>
    </>
  );
}
