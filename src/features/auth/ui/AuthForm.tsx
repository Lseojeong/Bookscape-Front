import { FormHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

type AuthFormProps = FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function AuthForm({ children, onSubmit, className, ...props }: AuthFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-5', className)} {...props}>
      {children}
    </form>
  );
}
