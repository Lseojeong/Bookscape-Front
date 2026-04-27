'use client';

import { useEffect } from 'react';

type UseBodyScrollLockParams = {
  /** 스크롤 잠금을 활성화할지 여부 */
  isLocked: boolean;
};

let lockCount = 0;
let prevOverflow: string | null = null;
let prevPaddingRight: string | null = null;

const getScrollbarWidth = () => {
  return window.innerWidth - document.documentElement.clientWidth;
};

/**
 * useBodyScrollLock
 *
 * 모달/바텀시트 등 오버레이가 열려 있을 때 body 스크롤을 잠그는 훅입니다.
 *
 * @remarks
 * - 여러 오버레이가 동시에 열릴 수 있으므로 ref-count 기반으로 잠금을 관리합니다.
 * - 잠금 시 스크롤바가 사라지며 레이아웃이 흔들릴 수 있어, scrollbar width만큼
 *   `padding-right`를 보정합니다.
 *
 * @param params.isLocked - 스크롤 잠금 활성화 여부
 *
 * @example
 * ```tsx
 * useBodyScrollLock({ isLocked: isOpen });
 * ```
 */
const useBodyScrollLock = ({ isLocked }: UseBodyScrollLockParams) => {
  useEffect(() => {
    if (!isLocked) {
      return;
    }

    if (typeof document === 'undefined') {
      return;
    }

    lockCount += 1;
    if (lockCount === 1) {
      const body = document.body;
      prevOverflow = body.style.overflow;
      prevPaddingRight = body.style.paddingRight;

      const scrollbarWidth = getScrollbarWidth();
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }

      body.style.overflow = 'hidden';
    }

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount !== 0) {
        return;
      }

      const body = document.body;
      body.style.overflow = prevOverflow ?? '';
      body.style.paddingRight = prevPaddingRight ?? '';
      prevOverflow = null;
      prevPaddingRight = null;
    };
  }, [isLocked]);
};

export default useBodyScrollLock;
