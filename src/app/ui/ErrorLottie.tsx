'use client';

import Lottie from 'react-lottie-player';
import { Error500Animation } from '@/shared/assets/lotties';
import { cn } from '@/shared/utils/cn';

type ErrorLottieProps = {
  className?: string;
};

/**
 * 500 에러 페이지에서 사용되는 Lottie 애니메이션 컴포넌트입니다.
 *
 * @example
 * <ErrorLottie />
 * <ErrorLottie className="h-40 w-40" />
 */
export default function ErrorLottie({ className }: ErrorLottieProps) {
  return (
    <Lottie
      aria-hidden="true"
      className={cn('h-30 w-30 shrink-0', className)}
      animationData={Error500Animation}
      loop
      play
    />
  );
}
