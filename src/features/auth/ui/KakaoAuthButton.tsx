import { ButtonHTMLAttributes } from 'react';
import { KakaoIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

type KakaoAuthButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string; // '로그인' | '회원가입';
  className?: string;
};
export default function KakaoAuthButton({
  label,
  className,
  type = 'button',
  ...props
}: KakaoAuthButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'flex h-13.5 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl',
        'border border-gray-200 bg-kakao-bg py-3 hover:bg-[#fbd604]',
        className
      )}
      {...props}
    >
      <p className="flex gap-1.5">
        <KakaoIcon />
        <span className="typo-16-medium">카카오 {label}</span>
      </p>
    </button>
  );
}
