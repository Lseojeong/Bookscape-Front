'use client';

import { useEffect } from 'react';

type UseEscapeKeyParams = {
  /** ESC 키 처리를 활성화할지 여부 */
  isEnabled: boolean;
  /** ESC 입력 시 실행할 콜백 */
  onEscape: () => void;
};

/**
 * useEscapeKey
 *
 * ESC 키 입력을 구독하는 공통 훅입니다.
 *
 * @remarks
 * - `isEnabled`가 `false`이면 이벤트를 등록하지 않습니다.
 * - `onEscape`는 ESC 키를 눌렀을 때만 호출됩니다.
 *
 * @param params.isEnabled - ESC 키 처리 활성화 여부
 * @param params.onEscape - ESC 입력 시 실행할 콜백
 */
const useEscapeKey = ({ isEnabled, onEscape }: UseEscapeKeyParams) => {
  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') {
        return;
      }

      e.preventDefault();
      onEscape();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isEnabled, onEscape]);
};

export default useEscapeKey;
