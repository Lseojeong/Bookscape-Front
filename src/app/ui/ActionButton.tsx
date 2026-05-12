'use client';

import Link from 'next/link';
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import { cn } from '@/shared/utils/cn';

type ActionButtonVariant = 'primary';

type ActionButtonBaseProps = PropsWithChildren<{
  variant?: ActionButtonVariant;
  className?: string;
}>;

type ActionButtonLinkProps = ActionButtonBaseProps & {
  href: ComponentPropsWithoutRef<typeof Link>['href'];
} & Omit<ComponentPropsWithoutRef<typeof Link>, 'href' | 'className' | 'children'>;

type ActionButtonActionProps = ActionButtonBaseProps & {
  href?: undefined;
} & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>;

type ActionButtonProps = ActionButtonLinkProps | ActionButtonActionProps;

const variantClassName: Record<ActionButtonVariant, string> = {
  primary: 'bg-white text-primary-500 hover:bg-primary-600 hover:text-white',
};

/**
 * 링크(`href`가 있을 때) 또는 버튼(`href`가 없을 때)으로 동작하는 공통 액션 버튼 컴포넌트입니다.
 *
 * @example
 * <ActionButton href="/">홈으로</ActionButton>
 * <ActionButton onClick={() => {}}>클릭</ActionButton>
 */
export default function ActionButton({
  children,
  variant = 'primary',
  className,
  ...props
}: ActionButtonProps) {
  const commonClassName = cn(
    'inline-flex h-10.5 items-center justify-center rounded-md px-5 typo-16-bold transition-colors',
    variantClassName[variant],
    className
  );

  if ('href' in props && props.href != null) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={commonClassName} {...rest}>
        {children}
      </Link>
    );
  }

  const { href: _href, type = 'button', ...rest } = props;
  return (
    <button type={type} className={commonClassName} {...rest}>
      {children}
    </button>
  );
}
