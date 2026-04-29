'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { KakaoIcon } from '@/shared/assets/icons';
import Button from '@/shared/ui/button/Button';

export default function AuthFooter() {
  const isLogin = usePathname() === '/login';

  const linkConfig = {
    pathname: isLogin ? '로그인' : '회원가입',
    href: isLogin ? '/signup' : '/login',
    label: isLogin ? '회원가입' : '로그인',
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
        <Button theme="secondary" size="lg" className="h-13.5 w-full bg-kakao-bg text-gray-900">
          <p className="flex gap-1.5">
            <KakaoIcon />
            카카오 {linkConfig.pathname}
          </p>
        </Button>
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
