import { createContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';

/**
 * Dropdown 컴포넌트 Context 타입
 * @property isOpen - 드롭다운이 열려있는지 여부
 * @property setIsOpen - 드롭다운 open 상태를 제어하는 함수
 */
type BaseDropdownContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

/**
 * ## BaseDropdownContext
 *
 * @description
 * Dropdown의 열림/닫힘(open) 상태만 담당하는 베이스 컨텍스트입니다.
 */
export const BaseDropdownContext = createContext<BaseDropdownContextType | undefined>(undefined);
