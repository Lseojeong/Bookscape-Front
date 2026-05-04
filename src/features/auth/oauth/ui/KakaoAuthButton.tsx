import { AnchorHTMLAttributes } from 'react';
import { KakaoIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

type KakaoAuthButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string; // '로그인' | '회원가입';
  className?: string;
  href: string;
};

export default function KakaoAuthButton({
  label,
  className,
  href,
  ...props
}: KakaoAuthButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        'flex h-13.5 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl',
        'border border-gray-200 bg-kakao-bg py-3 hover:bg-yellow-500',
        className
      )}
      {...props}
    >
      <span className="flex gap-1.5">
        <KakaoIcon />
        <span className="typo-16-medium">카카오 {label}</span>
      </span>
    </a>
  );
}
