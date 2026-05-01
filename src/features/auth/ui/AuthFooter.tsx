'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import KaKaoButton from '@/shared/ui/button/KaKaoButton';

/**
 * 로그인 및 회원가입 폼 하단에 공통으로 사용되는 컴포넌트입니다.
 * 현재 경로(pathname)에 따라 카카오 버튼 텍스트와 페이지 이동 링크가 동적으로 변경됩니다.
 * - 로그인 페이지: 카카오 로그인 버튼 + 회원가입 페이지 이동 링크
 * - 회원가입 페이지: 카카오 회원가입 버튼 + 로그인 페이지 이동 링크
 */
export default function AuthFooter() {
  const isLogin = usePathname() === '/login';

  const linkConfig = {
    pathname: isLogin ? '로그인' : '회원가입', // 현재 페이지
    href: isLogin ? '/signup' : '/login',
    label: isLogin ? '회원가입' : '로그인', // 이동할 페이지의 이름
    description: isLogin ? '회원이 아니신가요?' : '이미 회원이신가요?',
  };
  return (
    <>
      {/* 버튼 사이 중간 바 */}
      <div className="flex items-center gap-3.5">
        <span className="inline-block h-px w-full bg-gray-100" />
        <span className="text-gray-600">or</span>
        <span className="inline-block h-px w-full bg-gray-100" />
      </div>

      {/* 카카오 버튼 및 링크 이동 */}
      <div className="flex flex-col justify-center gap-6">
        <KaKaoButton mode={linkConfig.pathname} />
        <p className="text-center text-gray-400">
          {linkConfig.description}{' '}
          <Link href={linkConfig.href}>
            <span className="underline">{linkConfig.label}하기</span>
          </Link>
        </p>
      </div>
    </>
  );
}
