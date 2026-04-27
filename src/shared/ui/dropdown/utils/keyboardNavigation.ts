import type { KeyboardEvent } from 'react';
import { moveFocus, moveToEdge } from '@/shared/ui/dropdown/utils/focusNavigate';

type RovingFocusKeyDownParams = {
  disabled?: boolean;
  onActivate: () => void;
};

/**
 * handleRovingFocusKeyDown
 *
 * 드롭다운 아이템에서 사용하는 roving focus 키보드 네비게이션 핸들러입니다.
 *
 * @remarks
 * - `ArrowDown`/`ArrowUp`: 이전/다음 아이템으로 포커스 이동
 * - `Home`/`End`: 첫/마지막 아이템으로 포커스 이동
 * - `Enter`/`Space`: 아이템 활성화(onActivate 실행)
 * - `disabled`가 `true`면 아무 동작도 하지 않습니다.
 *
 * @param e - React KeyboardEvent
 * @param params.disabled - 비활성화 여부
 * @param params.onActivate - Enter/Space 입력 시 실행할 콜백
 */
export const handleRovingFocusKeyDown = <T extends HTMLElement>(
  e: KeyboardEvent<T>,
  { disabled, onActivate }: RovingFocusKeyDownParams
) => {
  if (disabled) {
    return;
  }

  const current = e.currentTarget;
  const key = e.key;

  if (
    key === 'ArrowDown' ||
    key === 'ArrowUp' ||
    key === 'Home' ||
    key === 'End' ||
    key === 'Enter' ||
    key === ' '
  ) {
    e.preventDefault();
  } else {
    return;
  }

  switch (key) {
    case 'ArrowDown':
      moveFocus(current, 'next');
      break;
    case 'ArrowUp':
      moveFocus(current, 'prev');
      break;
    case 'Home':
      moveToEdge(current, 'first');
      break;
    case 'End':
      moveToEdge(current, 'last');
      break;
    case 'Enter':
    case ' ':
      onActivate();
      break;
  }
};
