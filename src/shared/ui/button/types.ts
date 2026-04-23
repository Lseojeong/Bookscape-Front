import type { ComponentProps, ElementType, ReactNode, MouseEventHandler } from 'react';

export type ButtonTheme = 'primary' | 'secondary' | 'gray';
export type ButtonSize = 'lg' | 'md' | 'sm' | 'icon';

// 버튼 Props 정의
export type ButtonBaseProps = {
  theme?: ButtonTheme;
  size?: ButtonSize;
  children?: ReactNode;
  type?: ComponentProps<'button'>['type'];
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
};

// as로 다형성 지원 타입
export type ButtonProps<T extends ElementType = 'button'> = ButtonBaseProps & {
  as?: T;
};

// 전달된 태그의 기본 HTML 속성들을 상속받도록 Omit 병합
export type PolymorphicButtonProps<T extends ElementType = 'button'> = ButtonProps<T> &
  Omit<ComponentProps<T>, keyof ButtonProps<T>>;
