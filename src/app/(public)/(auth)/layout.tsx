import AuthBranding from '@/features/auth/ui/AuthBranding';
import AuthHeadline from '@/features/auth/ui/AuthHeadline';

/**
 * 로그인 및 회원가입 페이지에서 공통으로 사용되는 레이아웃 컴포넌트입니다.
 * 좌측에 헤드라인과 폼 영역, 우측에 브랜딩 이미지 영역으로 구성됩니다.
 * 브랜딩 영역은 lg 브레이크 포인트 이상에서만 표시됩니다.
 */
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex justify-between">
      <div className="mt-13.5 mb-29.5 grow px-6 md:mt-29.5 md:px-13.5">
        <AuthHeadline />
        <div className="mt-17 md:mt-22">{children}</div>
      </div>
      <div className="hidden shrink-0 transition-all lg:block lg:w-130 xl:w-200 2xl:w-250">
        <AuthBranding />
      </div>
    </main>
  );
}
