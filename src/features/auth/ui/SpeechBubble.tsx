import { ImageProps } from 'next/image';
import { SpeechBubbleImage } from '@/shared/assets/images';
import { cn } from '@/shared/utils/cn';

type SpeechBubbleProps = Omit<ImageProps, 'src' | 'alt'> & {
  flip?: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function SpeechBubble({ flip, className, children }: SpeechBubbleProps) {
  return (
    <div className={cn('relative', flip && '-scale-x-100', className)}>
      <SpeechBubbleImage />
      <p
        className={cn(
          'absolute inset-0 z-10 flex translate-y-8.25 justify-center typo-18-medium text-gray-900',
          flip && '-scale-x-100'
        )}
      >
        {children}
      </p>
    </div>
  );
}
