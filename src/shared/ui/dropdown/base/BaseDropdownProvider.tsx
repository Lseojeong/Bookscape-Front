'use client';

import { useState } from 'react';
import { WithChildren } from '@/shared/types/common';
import { BaseDropdownContext } from '@/shared/ui/dropdown/context/baseDropdownContext';

/**
 * ## BaseDropdownProvider
 *
 * @description
 * Dropdown 컴포넌트의 공통 open 상태를 제공하는 Provider 컴포넌트입니다.
 *
 * - BaseDropdownContext에 `isOpen`과 `setIsOpen`을 공급합니다.
 * - ActionDropdown, SelectDropdown 모두에서 사용됩니다.
 * - 선택 값(value)과 관련된 상태는 관리하지 않습니다.
 * - Dropdown의 open/close 상태만 담당하며, 선택 값은 SelectContext에서 별도로 관리합니다.
 */
export default function BaseDropdownProvider({ children }: WithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  return <BaseDropdownContext value={{ isOpen, setIsOpen }}>{children}</BaseDropdownContext>;
}
