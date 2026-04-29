import type { ComponentProps } from 'react';
import { cn } from '@/shared/utils/cn';

type FormErrorMessageProps = ComponentProps<'p'>;

/**
 * 요소 하단에 에러 내용을 표시하는 메시지 컴포넌트입니다.
 * @example
 * <FormErrorMessage>이메일 형식으로 작성해 주세요.</FormErrorMessage>
 */
export default function FormErrorMessage({ children, className, ...props }: FormErrorMessageProps) {
  if (!children) return null;

  return (
    <p className={cn('ml-2 typo-12-medium text-error', className)} role="alert" {...props}>
      {children}
    </p>
  );
}
