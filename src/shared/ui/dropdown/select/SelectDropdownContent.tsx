'use client';

import { WithChildren } from '@/shared/types/common';
import useDropdownBaseContext from '@/shared/ui/dropdown/hooks/useDropdownBaseContext';
import useSelectContext from '@/shared/ui/dropdown/hooks/useSelectDropdownContext';
import {
  dropdownListBase,
  dropdownListShadowStyle,
} from '@/shared/ui/dropdown/styles/dropdownContent';
import { cn } from '@/shared/utils/cn';

type SelectDropdownContentProps = WithChildren & {
  /** 옵션 리스트 영역에 추가로 적용할 커스텀 스타일 */
  className?: string;
};

const dropdownContentVariants = {
  basic: 'w-full rounded-2xl border border-gray-100',
  shadow: dropdownListShadowStyle,
};

const dropdownScrollAreaVariants = {
  basic: 'max-h-83 w-full overflow-y-auto overflow-x-hidden p-3 scrollbar-thin',
  shadow: '',
};

/**
 * SelectDropdownContent
 *
 * @description
 * SelectDropdown의 옵션 리스트 영역입니다.
 * - DropdownBaseContext의 `isOpen` 상태에 따라 렌더링됩니다.
 * - 닫힌 상태에서는 DOM에 마운트되지 않습니다.
 */
export default function SelectDropdownContent({ children, className }: SelectDropdownContentProps) {
  const { isOpen } = useDropdownBaseContext();
  const { triggerId, variants } = useSelectContext();

  if (!isOpen) {
    return null;
  }

  return (
    <div className={cn(dropdownListBase, dropdownContentVariants[variants], className)}>
      <ul
        role="listbox"
        aria-labelledby={triggerId}
        className={cn('flex w-full flex-col gap-1', dropdownScrollAreaVariants[variants])}
      >
        {children}
      </ul>
    </div>
  );
}
