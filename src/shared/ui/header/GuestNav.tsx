import { cva } from 'class-variance-authority';
import Link from 'next/link';
import type { HeaderTheme } from '@/shared/ui/header/types';
import { cn } from '@/shared/utils/cn';

const authLinkVariants = cva('typo-14-medium rounded-md px-3 py-2 transition-colors', {
  variants: {
    theme: {
      primary: 'text-white hover:bg-primary-600',
      light: 'text-gray-950 hover:bg-primary-100',
    },
  },
  defaultVariants: {
    theme: 'light',
  },
});

/**
 * GuestNav 컴포넌트 Props 입니다.
 *
 * @property theme - 헤더 테마 (`'primary' | 'light'`)
 * @property className - wrapper에 추가할 클래스
 */
type GuestNavProps = {
  theme: HeaderTheme;
  className?: string;
};

/**
 * ## GuestNav
 *
 * 비로그인 상태에서 사용하는 헤더 우측 메뉴(로그인/회원가입 링크) 컴포넌트입니다.
 *
 * @param props.theme - 헤더 테마
 * @param props.className - 추가 클래스
 */
export default function GuestNav({ theme, className }: GuestNavProps) {
  return (
    <nav aria-label="인증 메뉴" className={cn('flex items-center gap-5', className)}>
      <Link href="/login" className={authLinkVariants({ theme })}>
        로그인
      </Link>
      <Link href="/signup" className={authLinkVariants({ theme })}>
        회원가입
      </Link>
    </nav>
  );
}
