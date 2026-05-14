'use client';

import Lottie from 'react-lottie-player';
import { NotFound404Animation } from '@/shared/assets/lotties';
import { cn } from '@/shared/utils/cn';

type NotFoundLottieProps = {
  className?: string;
};

export default function NotFoundLottie({ className }: NotFoundLottieProps) {
  return (
    <Lottie
      aria-hidden="true"
      className={cn('w-80 max-w-full shrink-0', className)}
      animationData={NotFound404Animation}
      loop
      play
    />
  );
}
