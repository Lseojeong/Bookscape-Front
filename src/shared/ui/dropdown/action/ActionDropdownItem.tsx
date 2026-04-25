'use client';

import type { KeyboardEvent } from 'react';
import { WithChildren } from '@/shared/types/common';
import useDropdownBaseContext from '@/shared/ui/dropdown/hooks/useDropdownBaseContext';
import {
  dropdownItemBase,
  dropdownItemHoverBase,
  dropdownItemShadowStyle,
} from '@/shared/ui/dropdown/styles/dropdownItem';
import { handleRovingFocusKeyDown } from '@/shared/ui/dropdown/utils/keyboardNavigation';
import { cn } from '@/shared/utils/cn';

type ActionDropdownItemProps = WithChildren & {
  /** 메뉴 선택 시 실행될 콜백 함수 */
  onClick: () => void;
  /** 추가로 적용할 스타일 (width 세부 조절 필요 시) */
  className?: string;
};

/**
 * ActionDropdownItem
 *
 * @description
 * ActionDropdown에서 사용되는 개별 메뉴 아이템 컴포넌트입니다.
 * - 선택 시 드롭다운을 닫은 후, 전달받은 `onClick` 콜백을 실행합니다.
 *
 * @example
 * ```tsx
 * <ActionDropdownItem onClick={handleEdit}>
 *   수정하기
 * </ActionDropdownItem>
 * ```
 */
export default function ActionDropdownItem({
  children,
  onClick,
  className,
}: ActionDropdownItemProps) {
  const { setIsOpen } = useDropdownBaseContext();

  const executeAction = () => {
    onClick();
    setIsOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    handleRovingFocusKeyDown(e, { onActivate: executeAction });
  };

  return (
    <button
      role="menuitem"
      type="button"
      className={cn(dropdownItemBase, dropdownItemHoverBase, dropdownItemShadowStyle, className)}
      onKeyDown={handleKeyDown}
      onClick={executeAction}
    >
      {children}
    </button>
  );
}
