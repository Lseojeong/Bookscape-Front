'use client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { LoginRequest, LoginResponse } from '@/features/auth/types/auth';
import AuthFooter from '@/features/auth/ui/AuthFooter';
import AuthForm from '@/features/auth/ui/AuthForm';
import { bffFetch } from '@/shared/apis/base/bffFetch';
import { useAuthStore } from '@/shared/stores/useAuthStore';
import Button from '@/shared/ui/button/Button';
import FormField from '@/shared/ui/form/FormField';
import FormInput from '@/shared/ui/form/FormInput';
import PasswordInput from '@/shared/ui/input/PasswordInput';
import { cn } from '@/shared/utils/cn';

/**
 * 로그인 페이지 컴포넌트입니다.
 * 이메일과 비밀번호를 통한 인증을 처리합니다.
 * 성공 시 유저 정보를 Zustand 스토어에 저장하고 메인 페이지로 이동합니다.
 */
export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  /** 로그인 요청 핸들러 */
  const handleLogin = useCallback(
    async (formData: LoginRequest) => {
      try {
        const response = await bffFetch.post<LoginResponse>('/auth/login', formData);

        if (response) {
          const { user } = response;

          // 토큰 만료 시간 계산 (현재 시간 기준 30분)
          const EXPIRE_TIME = 1000 * 60 * 30;
          const expiresIn = Date.now() + EXPIRE_TIME;

          // 전역 상태(Zustand) 업데이트
          setAuth(
            {
              id: user.id,
              email: user.email,
              nickname: user.nickname,
            },
            expiresIn
          );

          // 쿠키 상태 동기화를 위해 refresh 후 이동
          router.push('/');
          router.refresh();
        }
      } catch {
        // react-hook-form의 root 에러 설정
        setError('root', {
          type: 'server',
          message: '이메일 또는 비밀번호가 일치하지 않습니다.',
        });
      }
    },
    [router, setAuth, setError]
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

        {/* API 에러 메시지 */}
        {errors.root && (
          <p className="translate-y-3 typo-13-medium text-red-500" role="alert">
            {errors.root.message}
          </p>
        )}

        <Button
          type="submit"
          theme="primary"
          size="lg"
          isLoading={isSubmitting}
          disabled={!isValid || isSubmitting}
          className={cn('h-13.5 w-full rounded-2xl md:mt-2.5', errors.root ? 'mt-0' : 'mt-2')}
        >
          로그인 하기
        </Button>
      </AuthForm>
      <AuthFooter />
    </>
  );
}
