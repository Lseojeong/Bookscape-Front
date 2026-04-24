type FocusDirection = 'next' | 'prev';
type FocusEdge = 'first' | 'last';

/**
 * moveFocus
 *
 * 현재 요소를 기준으로 같은 부모의 형제 요소로 포커스를 이동합니다.
 *
 * @remarks
 * - `direction="next"`면 다음 형제, `"prev"`면 이전 형제로 이동합니다.
 * - `aria-disabled="true"`인 요소는 건너뜁니다.
 * - 이동 가능한 요소가 없으면 아무 동작도 하지 않습니다.
 *
 * @param current - 현재 포커스를 가진 요소
 * @param direction - 포커스 이동 방향 (`'next' | 'prev'`)
 *
 * @example
 * ```ts
 * moveFocus(currentElement, 'next'); // ArrowDown
 * moveFocus(currentElement, 'prev'); // ArrowUp
 * ```
 */
export const moveFocus = (current: HTMLElement, direction: FocusDirection) => {
  let target = direction === 'next' ? current.nextElementSibling : current.previousElementSibling;

  while (target) {
    if (target instanceof HTMLElement && target.getAttribute('aria-disabled') !== 'true') {
      target.focus();
      return;
    }

    target = direction === 'next' ? target.nextElementSibling : target.previousElementSibling;
  }
};

/**
 * moveToEdge
 *
 * 현재 요소가 속한 컨테이너의 첫 번째 또는 마지막 요소로 포커스를 이동합니다.
 *
 * @remarks
 * - `direction="first"`면 첫 번째, `"last"`면 마지막 요소로 이동합니다.
 * - `aria-disabled="true"`인 요소는 건너뜁니다.
 * - 부모 요소가 없거나 이동 가능한 요소가 없으면 아무 동작도 하지 않습니다.
 *
 * @param current - 현재 포커스를 가진 요소
 * @param direction - 이동 위치 (`'first' | 'last'`)
 *
 * @example
 * ```ts
 * moveToEdge(currentElement, 'first'); // Home
 * moveToEdge(currentElement, 'last');  // End
 * ```
 */
export const moveToEdge = (current: HTMLElement, direction: FocusEdge) => {
  const parent = current.parentElement;
  if (!parent) {
    return;
  }

  let target = direction === 'first' ? parent.firstElementChild : parent.lastElementChild;

  while (target) {
    if (target instanceof HTMLElement && target.getAttribute('aria-disabled') !== 'true') {
      target.focus();
      return;
    }

    target = direction === 'first' ? target.nextElementSibling : target.previousElementSibling;
  }
};
