import type { ComponentProps } from 'react';
import { cn } from '@/shared/utils/cn';

type FormLabelProps = ComponentProps<'label'> & {
  weight?: 'medium' | 'bold';
};

/**
 * 제목을 나타내는 Label 컴포넌트입니다.
 * `weight` 속성을 통해 글꼴의 굵기를 조절할 수 있습니다.
 * @example
 * ```tsx
 * // 기본 굵기 (medium) 적용
 * <FormLabel htmlFor="email">이메일</FormLabel>
 * // 강조된 굵기 (bold) 적용
 * <FormLabel htmlFor="password" weight="bold">비밀번호</FormLabel>
 * ```
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
