import { KakaoIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

type KaKaoButtonProps = {
  mode: string; // '로그인' | '회원가입'
  className?: string;
};
export default function KaKaoButton({ mode, className }: KaKaoButtonProps) {
  return (
    <button
      className={cn(
        'flex h-13.5 w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-kakao-bg py-3',
        className
      )}
    >
      <p className="flex gap-1.5">
        <KakaoIcon />
        <span className="typo-16-medium">카카오 {mode}</span>
      </p>
    </button>
  );
}
