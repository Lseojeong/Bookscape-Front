import type { ReactNode } from 'react';

/**
 * ## 공통 children 타입
 *
 * @description
 * - React 컴포넌트에서 `children`을 props로 받는 경우 사용되는 공통 타입입니다.
 * - 컴포넌트의 구조적 자식 요소를 명시적으로 표현하기 위해 사용합니다.
 *
 * @example
 * ```ts
 * interface ModalProps extends WithChildren {
 *   title: string;
 * }
 * ```
 */
export interface WithChildren {
  children: ReactNode;
}
