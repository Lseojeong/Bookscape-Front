import { createContext } from 'react';

/**
 * SelectDropdown의 선택 상태 Context 타입입니다.
 *
 * @property value - 현재 선택된 값
 * @property onChangeValue - 선택 값을 변경하는 함수
 */
interface SelectContextType {
  value: string;
  onChangeValue: (value: string) => void;
}

/**
 * SelectContext
 *
 * SelectDropdown의 선택 상태를 관리하는 Context입니다.
 *
 * @remarks
 * - Dropdown의 열림/닫힘 상태는 관리하지 않습니다.
 * - ActionDropdown에서는 사용하지 금지!
 */
export const SelectContext = createContext<SelectContextType | undefined>(undefined);
