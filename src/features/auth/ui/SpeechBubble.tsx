import { SpeechBubbleImage } from '@/shared/assets/images';
import { cn } from '@/shared/utils/cn';

type SpeechBubbleProps = React.HTMLAttributes<HTMLDivElement> & {
  isFlipped?: boolean;
};

/**
 * 로그인 및 회원가입 페이지 브랜딩 영역에서 사용자 후기를 표시하는 말풍선 컴포넌트입니다.
 * isFlipped prop으로 말풍선 방향을 좌우 반전할 수 있습니다.
 */
export default function SpeechBubble({ isFlipped, className, children }: SpeechBubbleProps) {
  return (
    <div className={cn('relative', isFlipped && '-scale-x-100', className)}>
      <SpeechBubbleImage />
      <p
        className={cn(
          'absolute inset-0 z-10 flex translate-y-8.25 justify-center typo-18-medium text-gray-900',
          isFlipped && '-scale-x-100'
        )}
      >
        {children}
      </p>
    </div>
  );
}
