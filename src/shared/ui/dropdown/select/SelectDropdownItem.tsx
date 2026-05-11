'use client';

import { cva } from 'class-variance-authority';
import type { KeyboardEvent } from 'react';
import { WithChildren } from '@/shared/types/common';
import useDropdownBaseContext from '@/shared/ui/dropdown/hooks/useDropdownBaseContext';
import useSelectContext from '@/shared/ui/dropdown/hooks/useSelectDropdownContext';
import {
  dropdownItemHoverBase,
  dropdownItemBase,
  dropdownItemShadowStyle,
} from '@/shared/ui/dropdown/styles/dropdownItem';
import { handleRovingFocusKeyDown } from '@/shared/ui/dropdown/utils/keyboardNavigation';
import { cn } from '@/shared/utils/cn';

export const dropdownItemVariants = cva(dropdownItemBase, {
  variants: {
    variants: {
      basic: 'rounded-xl px-5 py-3 typo-16-medium',
      shadow: dropdownItemShadowStyle,
    },
    disabled: {
      true: 'cursor-not-allowed bg-gray-25 text-gray-400',
      false: 'text-gray-800 hover:font-bold',
    },
    selected: {
      true: 'text-primary-500',
      false: '',
    },
  },
  compoundVariants: [
    {
      disabled: false,
      className: dropdownItemHoverBase,
    },
  ],
  defaultVariants: {
    variants: 'basic',
    disabled: false,
    selected: false,
  },
});

type SelectDropdownItemProps<T = string> = WithChildren & {
  /** 옵션의 실제 선택 값 */
  value: T;
  /** 옵션 비활성화 여부 */
  disabled?: boolean;
};

/**
 * SelectDropdownItem
 *
 * @description
 * SelectDropdown 내에서 하나의 선택 가능한 옵션을 표현하는 컴포넌트입니다.
 *
 * - `value`를 기준으로 현재 선택 상태를 판단합니다.
 * - 클릭 또는 키보드(Enter / Space)로 선택할 수 있습니다.
 * - 선택 시 값을 변경하고 드롭다운을 닫습니다.
 * - `disabled` 상태인 경우 선택 및 포커스를 차단합니다.
 *
 * @example
 * ```tsx
 * <SelectDropdownItem value={문화 · 예술}>문화 · 예술</SelectDropdownItem>
 * ```
 */
export default function SelectDropdownItem<T = string>({
  children,
  value,
  disabled = false,
}: SelectDropdownItemProps<T>) {
  const { setIsOpen } = useDropdownBaseContext();
  const { value: selectedValue, setValue, variants } = useSelectContext<T>();

  const isSelected = selectedValue === value;
  // 긴 텍스트는 `truncate`로 말줄임 처리되므로, hover 시 전체 내용을 확인할 수 있도록 title을 제공합니다.
  const title = typeof children === 'string' ? children : undefined;

  const selectOption = () => {
    if (disabled) {
      return;
    }
    setValue(value);
    setIsOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
    handleRovingFocusKeyDown(e, { disabled, onActivate: selectOption });
  };

  return (
    <li
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      className={cn(dropdownItemVariants({ variants, disabled, selected: isSelected }))}
      title={title}
      onClick={selectOption}
      onKeyDown={handleKeyDown}
    >
      {children}
    </li>
  );
}
