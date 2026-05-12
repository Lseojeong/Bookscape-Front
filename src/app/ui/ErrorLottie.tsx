'use client';

import Lottie from 'react-lottie-player';
import { Error500Animation } from '@/shared/assets/lotties';
import { cn } from '@/shared/utils/cn';

type ErrorLottieProps = {
  className?: string;
};

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
