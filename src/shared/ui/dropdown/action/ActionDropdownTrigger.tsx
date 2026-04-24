'use client';

import { WithChildren } from '@/shared/types/common';
import useDropdownBaseContext from '@/shared/ui/dropdown/hooks/useDropdownBaseContext';

type ActionDropdownTriggerProps = WithChildren & {
  /** 트리거 버튼에 추가로 적용할 스타일 */
  className?: string;
  /** 트리거 내부 콘텐츠가 아이콘일때 적용할 aria-label */
  ariaLabel?: string;
};

/**
 * ## ActionDropdownTrigger
 *
 * ActionDropdown의 트리거 버튼 컴포넌트입니다.
 *
 * - 클릭 시 드롭다운의 open 상태를 토글합니다.
 * - `button` 요소 기반으로 기본 키보드 접근성을 제공합니다.
 *
 * @example
 * ```tsx
 * <ActionDropdownTrigger ariaLabel="메뉴 열기">
 *   <MenuIcon aria-hidden className="h-6 w-6" />
 * </ActionDropdownTrigger>
 * ```
 */

export default function ActionDropdownTrigger({
  children,
  className,
  ariaLabel,
}: ActionDropdownTriggerProps) {
  const { isOpen, setIsOpen } = useDropdownBaseContext();

  return (
    <button
      type="button"
      aria-haspopup="menu"
      aria-label={ariaLabel}
      aria-expanded={isOpen}
      className={className}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {children}
    </button>
  );
}
