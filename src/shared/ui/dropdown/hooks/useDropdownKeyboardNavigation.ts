import { useCallback } from 'react';
import type { Dispatch, KeyboardEvent, RefObject, SetStateAction } from 'react';

type DropdownKeyboardEdge = 'first' | 'last';

/**
 * getEnabledDropdownItems
 *
 * 드롭다운 루트 요소 안에서 포커스 이동 대상이 되는 아이템 목록을 가져옵니다.
 *
 * @remarks
 * - `[role="menuitem"]`, `[role="option"]` 요소를 대상으로 합니다.
 * - `aria-disabled="true"`인 요소는 제외합니다.
 *
 * @param root - 드롭다운 루트 HTMLElement
 * @returns 이동 가능한 아이템(HTMLElement) 배열
 */
const getEnabledDropdownItems = (root: HTMLElement) => {
  return Array.from(
    root.querySelectorAll<HTMLElement>('[role="menuitem"], [role="option"]')
  ).filter((el) => el.getAttribute('aria-disabled') !== 'true');
};

/**
 * focusEdgeItem
 *
 * 드롭다운 루트 기준으로 첫 번째 또는 마지막 아이템으로 포커스를 이동합니다.
 *
 * @remarks
 * - `aria-disabled="true"`인 요소는 건너뜁니다.
 * - 이동 가능한 아이템이 없으면 아무 동작도 하지 않습니다.
 *
 * @param rootRef - 드롭다운 루트 ref
 * @param edge - 이동 위치 (`'first' | 'last'`)
 *
 * @example
 * ```ts
 * focusEdgeItem(rootRef, 'first'); // ArrowDown, Home
 * focusEdgeItem(rootRef, 'last');  // ArrowUp, End
 * ```
 */
const focusEdgeItem = (rootRef: RefObject<HTMLElement | null>, edge: DropdownKeyboardEdge) => {
  const root = rootRef.current;
  if (!root) return;

  const items = getEnabledDropdownItems(root);
  if (items.length === 0) return;

  const target = edge === 'first' ? items[0] : items[items.length - 1];
  target.focus();
};

type UseDropdownKeyboardNavigationParams = {
  rootRef: RefObject<HTMLElement | null>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

/**
 * useDropdownKeyboardNavigation
 *
 * 드롭다운 공통 키보드 네비게이션을 제공하는 훅입니다.
 *
 * @remarks
 * - `Escape`: 드롭다운 닫기
 * - `ArrowDown`/`Home`: 첫 enabled 아이템으로 포커스 이동
 * - `ArrowUp`/`End`: 마지막 enabled 아이템으로 포커스 이동
 * - 닫힌 상태에서 `Arrow`/`Home`/`End` 입력 시: 먼저 열고 다음 tick에 포커스 이동
 * - 아이템 컴포넌트에서 이미 `preventDefault()`된 이벤트는 건드리지 않습니다.
 *
 * @param params.rootRef - 드롭다운 루트 ref
 * @param params.isOpen - 드롭다운 open 상태
 * @param params.setIsOpen - 드롭다운 open 상태 setter
 * @returns 드롭다운 루트에 연결할 `onKeyDown` 핸들러
 */
export default function useDropdownKeyboardNavigation({
  rootRef,
  isOpen,
  setIsOpen,
}: UseDropdownKeyboardNavigationParams) {
  return useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.defaultPrevented) {
        return;
      }

      const key = e.key;

      if (key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        return;
      }

      if (key !== 'ArrowDown' && key !== 'ArrowUp' && key !== 'Home' && key !== 'End') {
        return;
      }

      e.preventDefault();

      const edge: DropdownKeyboardEdge = key === 'ArrowUp' || key === 'End' ? 'last' : 'first';

      if (!isOpen) {
        setIsOpen(true);
        setTimeout(() => focusEdgeItem(rootRef, edge), 0);
        return;
      }

      const target = e.target as HTMLElement | null;
      const isItemTarget =
        !!target &&
        (target.getAttribute('role') === 'menuitem' || target.getAttribute('role') === 'option');
      if (isItemTarget) {
        return;
      }

      focusEdgeItem(rootRef, edge);
    },
    [isOpen, rootRef, setIsOpen]
  );
}
