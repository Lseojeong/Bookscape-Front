'use client';

import type { ElementType } from 'react';
import type { PolymorphicButtonProps } from '@/shared/ui/button/types';
import { cn } from '@/shared/utils/cn';

export function Button<T extends ElementType = 'button'>({
  as,
  children,
  className,
  ...props
}: PolymorphicButtonProps<T>) {
  const Component = as || 'button';

  return (
    <Component
      className={cn('inline-flex items-center justify-center whitespace-nowrap', className)}
      {...props}
    >
      {children}
    </Component>
  );
}
