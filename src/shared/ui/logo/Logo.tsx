import Link from 'next/link';
import LogoIcon from '@/shared/assets/logo/logo.svg';
import { cn } from '@/shared/utils/cn';

type LogoProps = {
  variant?: 'default' | 'white'; // 로고 버전 구분 (default: 일반, white: 화이트)
  className?: string; // 외부에서 크기 지정
};

const logoVariantClassName = {
  default: '',
  white: '[--logo-color-main:white] [--logo-color-sub:white]',
};

/**
 * 클릭 시 메인 페이지로 이동하는 로고 공통 컴포넌트입니다.
 *
 * 헤더, 푸터, 로그인, 회원가입 페이지에서 사용되며
 * variant prop으로 화이트 버전과 일반 버전을 구분하여 사용할 수 있습니다.
 *
 * @example
 * ```tsx
 * // 일반 버전 로고
 * <Logo className="w-42 h-10" />
 *
 * // 화이트 버전 로고
 * <Logo variant="white" className="w-[118px] h-7" />
 * ```
 */
export default function Logo({ variant = 'default', className }: LogoProps) {
  return (
    <Link href="/" aria-label="Bookscape 메인 페이지로 이동">
      <div className={cn('inline-block', logoVariantClassName[variant], className)}>
        <LogoIcon aria-hidden="true" className="h-full w-auto" />
      </div>
    </Link>
  );
}
