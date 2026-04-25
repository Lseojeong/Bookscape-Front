'use client';

import { cva } from 'class-variance-authority';
import { usePathname } from 'next/navigation';
import type { AvatarUser } from '@/shared/ui/avatar/types';
import HeaderNav from '@/shared/ui/header/HeaderNav';
import Logo from '@/shared/ui/logo/Logo';
import { cn } from '@/shared/utils/cn';

type HeaderTheme = 'primary' | 'light';

const headerVariants = cva('h-12 md:h-20', {
  variants: {
    theme: {
      primary: 'bg-primary-500',
      light: 'border-gray-100 bg-white/60 backdrop-blur',
    },
  },
  defaultVariants: {
    theme: 'light',
  },
});

const headerInnerVariants = cva(
  'mx-auto flex h-full w-full max-w-380 items-center justify-between px-6 md:px-7.5 xl:px-50'
);

const logoVariantByTheme = {
  primary: 'white',
  light: 'default',
} as const;

/**
 * Header 컴포넌트 Props 입니다.
 *
 * @property isLoggedIn - 로그인 여부 (로그인 상태 + user 유무로 우측 메뉴가 결정됩니다)
 * @property user - 로그인 유저 정보
 * @property className - 헤더 wrapper에 추가할 클래스
 */
type HeaderProps = {
  isLoggedIn?: boolean;
  user?: AvatarUser;
  className?: string;
};

/**
 * ## Header
 *
 * 앱 상단 헤더 컴포넌트입니다.
 *
 * @remarks
 * - 모바일 높이 `48px`, `md`부터 `80px`입니다.
 * - `/` 경로에서는 primary 테마, 그 외는 light 테마 스타일을 적용합니다.
 * - 우측 영역은 `HeaderNav`에서 `isLoggedIn`/`user`로 분기합니다.
 *
 * @param props.isLoggedIn - 로그인 여부
 * @param props.user - 유저 정보
 * @param props.className - 추가 클래스
 */
export default function Header({ isLoggedIn = false, user, className }: HeaderProps) {
  const pathname = usePathname();
  const theme: HeaderTheme = pathname === '/' ? 'primary' : 'light';

  return (
    <header className={cn('sticky top-0 z-50', headerVariants({ theme }), className)}>
      <div className={headerInnerVariants()}>
        <h1 className="leading-none">
          <Logo variant={logoVariantByTheme[theme]} className="h-6 md:h-7" />
        </h1>

        <HeaderNav theme={theme} isLoggedIn={isLoggedIn} user={user} />
      </div>
    </header>
  );
}
