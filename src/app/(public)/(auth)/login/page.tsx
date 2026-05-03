'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import AuthFooter from '@/features/auth/ui/AuthFooter';
import AuthForm from '@/features/auth/ui/AuthForm';
import { useAuthStore } from '@/shared/stores/useAuthStore';
import Button from '@/shared/ui/button/Button';
import FormField from '@/shared/ui/form/FormField';
import FormInput from '@/shared/ui/form/FormInput';
import PasswordInput from '@/shared/ui/input/PasswordInput';
import { cn } from '@/shared/utils/cn';

// TODO : '라우트 구현' PR 머지 후 auth/type.ts에 재정의 필요
// type User = {
//   id: number;
//   email: string;
//   nickname: string;
//   profileImageUrl: string | null;
//   createdAt: string;
//   updatedAt: string;
// };

// type LoginResponse = {
//   accessToken: string;
//   refreshToken: string;
//   user: User;
// };

type LoginRequest = {
  email: string;
  password: string;
};

/**
 * 로그인 페이지 컴포넌트입니다.
 * 이메일과 비밀번호 입력 폼을 제공하며, react-hook-form으로 폼 상태를 관리합니다.
 * 하단에 카카오 로그인 및 회원가입 페이지 이동 링크가 포함됩니다.
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

  const handleLogin = async (formData: LoginRequest) => {
    try {
      // const result = await bffFetch.post<LoginResponse>('/auth/login', formData);

      const response = await fetch('https://sp-globalnomad-api.vercel.app/22-1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (result?.user) {
        // TODO : login/route.ts에 expiresAt 추가 필요
        // 전역 상태(Zustand) 업데이트
        setAuth(result.user, result.expiresAt);

        // 메인 페이지로 이동
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      setError('root', {
        type: 'server',
        message: '이메일 또는 비밀번호가 일치하지 않습니다.',
      });
    }
  };

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
          <p className="translate-y-3 typo-13-medium text-red-500">{errors.root.message}</p>
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
