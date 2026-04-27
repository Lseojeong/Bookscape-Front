'use client';

import { RefObject, useEffect } from 'react';

/**
 * useOutsideClick
 *
 * 지정한 요소의 바깥 영역을 클릭했을 때 콜백을 실행하는 훅입니다.
 *
 * 드롭다운, 모달 등 외부 클릭으로 닫혀야 하는 UI에서 사용합니다.
 *
 * @param ref - 외부 클릭 여부를 판단할 기준 DOM 요소의 ref
 * @param onOutsideClick - 기준 요소 바깥을 클릭했을 때 실행할 콜백
 * @param isEnabled - 외부 클릭 감지 활성화 여부
 *
 * @remarks
 * - 기준 요소 내부에서 발생한 클릭은 무시합니다.
 * - `isEnabled`가 `false`이면 이벤트를 등록하지 않습니다.
 * - Portal로 렌더링된 요소도 이벤트 전파 경로를 기준으로 처리할 수 있습니다.
 */

const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  onOutsideClick: () => void,
  isEnabled = true
) => {
  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) {
        return;
      }
      if (!ref.current) {
        return;
      }

      if (ref.current.contains(target)) {
        return;
      }

      onOutsideClick();
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [ref, onOutsideClick, isEnabled]);
};

export default useOutsideClick;
