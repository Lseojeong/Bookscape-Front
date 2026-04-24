'use client';

import { useRef } from 'react';
import useOutsideClick from '@/shared/hooks/useOutsideClick';
import { WithChildren } from '@/shared/types/common';
import useDropdownBaseContext from '@/shared/ui/dropdown/hooks/useDropdownBaseContext';
import useDropdownKeyboardNavigation from '@/shared/ui/dropdown/hooks/useDropdownKeyboardNavigation';
import { cn } from '@/shared/utils/cn';

type DropdownBaseRootProps = WithChildren & {
  /** 추가적인 클래스(스타일) */
  className?: string;
};

/**
 * ## DropdownBaseRoot
 *
 * @description
 * Dropdown 계열 컴포넌트의 공통 루트 래퍼 컴포넌트입니다.
 *
 * - Dropdown 전체 영역을 감싸는 기준 요소 역할을 합니다.
 * - `useOutsideClick` 훅을 연결하여,
 *   드롭다운 영역 외부를 클릭했을 때 open 상태를 닫습니다.
 * - `DropdownBaseContext`를 사용해서 `setIsOpen(false)`를 수행합니다.
 */
export default function BaseDropdown({ children, className }: DropdownBaseRootProps) {
  const { isOpen, setIsOpen } = useDropdownBaseContext();
  const rootRef = useRef<HTMLDivElement>(null);

  useOutsideClick(rootRef, () => {
    setIsOpen(false);
  });

  const handleKeyDown = useDropdownKeyboardNavigation({
    rootRef,
    isOpen,
    setIsOpen,
  });

  return (
    <div ref={rootRef} className={cn('relative select-none', className)} onKeyDown={handleKeyDown}>
      {children}
    </div>
  );
}
