import { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

type MainSectionLayoutProps = {
  children: ReactNode;
  className?: string;
};
export default function MainSectionLayout({ children, className }: MainSectionLayoutProps) {
  return (
    <section
      className={cn(
        'mx-auto mt-21.5 mb-10 flex max-w-280 flex-col px-6 md:mt-37.5 md:mb-25 md:px-7.5 xl:px-0',
        className
      )}
    >
      {children}
    </section>
  );
}
