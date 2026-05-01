import type { ButtonHTMLAttributes, ComponentProps } from 'react';
import { cn } from '@/shared/utils/cn';

type BaseProps = {
  weight?: 'medium' | 'bold';
};

/**
 * `htmlFor`를 받지 않는 Label props 타입입니다.
 *
 * @remarks
 * `htmlFor`가 없을 때 `FormLabel`은 `<button>`으로 렌더링됩니다.
 */
type ClickableFormLabelProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    htmlFor?: undefined;
  };

type NativeFormLabelProps = BaseProps & ComponentProps<'label'> & { htmlFor: string };

type FormLabelProps = ClickableFormLabelProps | NativeFormLabelProps;

/**
 * ### FormLabel
 *
 * 제목을 나타내는 Label 컴포넌트입니다.
 * `weight` 속성을 통해 글꼴의 굵기를 조절할 수 있습니다.
 *
 * @example
 * ```tsx
 * // 기본 굵기 (medium) 적용
 * <FormLabel htmlFor="email">이메일</FormLabel>
 * // 강조된 굵기 (bold) 적용
 * <FormLabel htmlFor="password" weight="bold">비밀번호</FormLabel>
 * ```
 *
 * @example
 * ```tsx
 *
 * // 드롭다운 컴포넌트(SelectDropdownTrigger 등)에 포커스 위임
 * <FormLabel onClick={() => triggerRef.current?.focus()}>
 *   카테고리
 * </FormLabel>
 * ```
 */
export default function FormLabel({
  children,
  weight = 'medium',
  className,
  ...props
}: FormLabelProps) {
  const baseClassName = cn(
    'block text-gray-950',
    weight === 'bold' ? 'typo-16-bold' : 'typo-16-medium',
    className
  );

  if ('htmlFor' in props && props.htmlFor) {
    return (
      <label className={baseClassName} {...props}>
        {children}
      </label>
    );
  }

  const { type, ...buttonProps } = props as ClickableFormLabelProps;

  return (
    <button
      type={type ?? 'button'}
      className={cn(baseClassName, 'w-fit cursor-pointer border-none bg-transparent p-0 text-left')}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
