'use client';
import { usePathname } from 'next/navigation';
import AuthHeadline from '@/app/(public)/(auth)/ui/AuthHeadline';
import AuthBranding from '@/features/auth/ui/AuthBranding';
import { cn } from '@/shared/utils/cn';

/**
 * 로그인 및 회원가입 페이지에서 공통으로 사용되는 레이아웃 컴포넌트입니다.
 * 좌측에 헤드라인과 폼 영역, 우측에 브랜딩 이미지 영역으로 구성됩니다.
 * 브랜딩 영역은 xl 브레이크 포인트 이상에서만 표시됩니다.
 */
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isSignupPage = pathname.includes('signup');

  return (
    <main className="flex min-h-dvh w-full items-center justify-center xl:justify-between">
      <div className={cn('mx-auto w-full max-w-187 px-6 md:px-13.5', isSignupPage && 'py-20')}>
        <AuthHeadline />
        <div className="mt-17 md:mt-22">{children}</div>
      </div>
      <div
        className={cn(
          'hidden shrink-0 transition-all xl:block',
          'xl:min-h-dvh xl:w-200 xl:self-stretch 2xl:w-250'
        )}
      >
        <AuthBranding />
      </div>
    </main>
  );
}
