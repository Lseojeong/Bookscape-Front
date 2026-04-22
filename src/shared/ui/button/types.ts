import type { ComponentProps, ElementType, ReactNode } from 'react';

// 버튼 Props 정의
export type ButtonBaseProps = {
  children?: ReactNode;
  className?: string;
};

// as로 다형성 지원 타입
export type ButtonProps<T extends ElementType = 'button'> = ButtonBaseProps & {
  as?: T;
};

// 전달된 태그의 기본 HTML 속성들을 상속받도록 Omit 병합
export type PolymorphicButtonProps<T extends ElementType = 'button'> = ButtonProps<T> &
  Omit<ComponentProps<T>, keyof ButtonProps<T>>;
