import type { ComponentProps } from 'react';
import { cn } from '@/shared/utils/cn';

type FormLabelProps = ComponentProps<'label'> & {
  weight?: 'medium' | 'bold';
};

/**
 * 제목을 나타내는 Label 컴포넌트입니다.
 * @example
 * <FormLabel htmlFor="email" weight="medium">이메일</FormLabel>
 */
export default function FormLabel({
  children,
  weight = 'medium',
  className,
  ...props
}: FormLabelProps) {
  return (
    <label
      className={cn(
        'block text-gray-950',
        weight === 'bold' ? 'typo-16-bold' : 'typo-16-medium',
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}
