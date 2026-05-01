import { ButtonHTMLAttributes } from 'react';
import { KakaoIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

type KaKaoButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string; // '로그인' | '회원가입';
  className?: string;
};
export default function KaKaoButton({
  label,
  className,
  type = 'button',
  ...props
}: KaKaoButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'flex h-13.5 w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-kakao-bg py-3',
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
