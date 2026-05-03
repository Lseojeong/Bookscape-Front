import { FormHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

type AuthFormProps = FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void> | void;
};

export default function AuthForm({ children, onSubmit, className, ...props }: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className={cn('flex flex-col gap-4 md:gap-5', className)} {...props}>
      {children}
    </form>
  );
}
