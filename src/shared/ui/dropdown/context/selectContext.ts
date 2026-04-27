import { createContext } from 'react';

/**
 * SelectDropdown의 선택 상태 Context 타입입니다.
 *
 * @property value - 현재 선택된 값
 * @property setValue - 선택 값을 변경하는 함수
 * @property triggerId - 트리거 버튼과 콘텐츠를 연결하는 id
 * @property variants - 드롭다운 스타일 variants ('basic' | 'shadow')
 */
export type SelectContextType<T> = {
  value: T;
  setValue: (value: T) => void;
  triggerId: string;
  variants: 'basic' | 'shadow';
};

/**
 * SelectContext
 *
 * SelectDropdown의 선택 상태를 관리하는 Context입니다.
 *
 * @remarks
 * - Dropdown의 열림/닫힘 상태는 관리하지 않습니다.
 * - ActionDropdown에서는 사용하지 않습니다.
 */
export const SelectContext = createContext<SelectContextType<unknown> | undefined>(undefined);
