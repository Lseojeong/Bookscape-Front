import { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

type BaseCardInfoProps = {
  children: ReactNode;
  containerClassName?: string;
};

export default function BaseCardInfo({ children, containerClassName }: BaseCardInfoProps) {
  return (
    <div
      className={cn(
        'absolute bottom-0 flex w-full flex-col rounded-[18px] bg-white',
        containerClassName
      )}
    >
      {children}
    </div>
  );
}
