import Link from 'next/link';
import LogoWhiteIcon from '@/shared/assets/logo/logo-white.svg';
import LogoIcon from '@/shared/assets/logo/logo.svg';

type LogoProps = {
  isWhite?: boolean; // 화이트 버전 여부 (헤더에서 사용)
  className?: string; // 외부에서 크기 지정
};

/**
 * 클릭 시 메인 페이지로 이동하는 로고 공통 컴포넌트입니다.
 *
 * 헤더, 푸터, 로그인, 회원가입 페이지에서 사용되며
 * isWhite prop으로 화이트 버전과 일반 버전을 구분하여 사용할 수 있습니다.
 *
 * @example
 * ```tsx
 * // 일반 버전 로고
 * <Logo className="w-42 h-10" />
 *
 * // 화이트 버전 로고
 * <Logo isWhite className="w-[118px] h-7" />
 * ```
 */
export default function Logo({ isWhite, className }: LogoProps) {
  return (
    <Link href="/">
      <h1 className={className}>{isWhite ? <LogoWhiteIcon /> : <LogoIcon />}</h1>
    </Link>
  );
}
