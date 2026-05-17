'use client';

import { cva } from 'class-variance-authority';
import { usePathname } from 'next/navigation';
import useScroll from '@/shared/hooks/useScroll';
import type { AvatarUser } from '@/shared/ui/avatar/types';
import HeaderNav from '@/shared/ui/header/HeaderNav';
import type { HeaderTheme } from '@/shared/ui/header/types';
import Logo from '@/shared/ui/logo/Logo';
import { cn } from '@/shared/utils/cn';

const headerVariants = cva('h-12 md:h-20', {
  variants: {
    theme: {
      primary: 'bg-primary-500',
      light: 'bg-white/60 backdrop-blur',
    },
  },
  defaultVariants: {
    theme: 'light',
  },
});

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
  onLogout: () => void;
};

/**
 * ## Header
 *
 * 앱 상단 헤더 컴포넌트입니다.
 *
 * @remarks
 * - 모바일 높이 `48px`, `md`부터 `80px`입니다.
 * - `/`, `/search` 경로에서는 스크롤 위치에 따라 primary/light 테마가 전환됩니다.
 * - 그 외 경로에서는 light 테마 스타일을 적용합니다.
 * - 우측 영역은 `HeaderNav`에서 `isLoggedIn`/`user`로 분기합니다.
 *
 * @example
 * ```tsx
 * // Guest
 * <Header />
 *
 * // Logged in
 * <Header
 *   isLoggedIn
 *   user={{ nickname: '정만철', profileImageUrl: 'https://...' }}
 * />
 * ```
 *
 * @param props.isLoggedIn - 로그인 여부
 * @param props.user - 유저 정보
 * @param props.className - 추가 클래스
 */
export default function Header({ isLoggedIn = false, user, className, onLogout }: HeaderProps) {
  const pathname = usePathname();
  const isScrollThemedPage = pathname === '/' || pathname === '/search';
  const { isScrolled } = useScroll({ isEnabled: isScrollThemedPage });

  const theme: HeaderTheme = isScrollThemedPage && !isScrolled ? 'primary' : 'light';
  const LogoWrapper = pathname === '/' || pathname === '/search' ? 'h1' : 'div';
  const isMyPage = pathname.startsWith('/mypage');
  const isActivityDetail = /^\/activity\/\d+/.test(pathname ?? '');
  const shouldUseSolidLightBg = theme === 'light' && (isActivityDetail || isMyPage);
  const myPageLightBgOverrideClassName =
    theme === 'light' && isMyPage && !isActivityDetail ? 'md:bg-white/60 md:backdrop-blur' : '';

  return (
    <header
      className={cn(
        'sticky top-0 layer-header',
        headerVariants({ theme }),
        shouldUseSolidLightBg && 'bg-white backdrop-blur-none',
        myPageLightBgOverrideClassName,
        className
      )}
    >
      <div className="shell-inner">
        <LogoWrapper className="leading-none">
          <Logo variant={logoVariantByTheme[theme]} className="h-6 md:h-7" />
        </LogoWrapper>

        <HeaderNav theme={theme} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} />
      </div>
    </header>
  );
}
