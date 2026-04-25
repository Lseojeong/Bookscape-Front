'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * useScroll 옵션입니다.
 */
export type UseScrollOptions = {
  /**
   * scroll 이벤트 구독 여부입니다.
   *
   * @remarks
   * - `/` 같은 특정 페이지에서만 동작시키고 싶을 때 사용합니다.
   */
  isEnabled?: boolean;

  /**
   * `isScrolled` 판정 기준(scrollY 임계값)입니다.
   *
   * @default 0
   */
  threshold?: number;
};

/**
 * useScroll
 *
 * 스크롤 상태를 구독하는 공통 훅입니다.
 *
 * @remarks
 * - `scroll` 이벤트는 매우 자주 발생하므로 `requestAnimationFrame` 기반으로 쓰로틀링합니다.
 * - `isScrolled`(임계값 초과 여부)가 바뀔 때만 state를 갱신해 불필요한 re-render를 줄입니다.
 * - SSR 환경에서는 `window`가 없으므로 아무 것도 구독하지 않고 초기값(false)만 반환합니다.
 *
 * @param options.isEnabled - 스크롤 구독 활성화 여부
 * @param options.threshold - `isScrolled` 판정 임계값 (scrollY > threshold)
 * @returns `isScrolled` - 스크롤이 임계값을 초과했는지 여부
 */
const useScroll = ({ isEnabled = true, threshold = 0 }: UseScrollOptions = {}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isEnabled) {
      // 비활성화 상태에서는 스크롤 구독을 하지 않고,
      // `isScrolled`를 기본값(false)로 되돌립니다.
      if (isScrolledRef.current) {
        isScrolledRef.current = false;
        setIsScrolled(false);
      }
      return;
    }

    if (typeof window === 'undefined') {
      return;
    }

    const update = () => {
      rafIdRef.current = null;

      const nextIsScrolled = window.scrollY > threshold;
      if (nextIsScrolled === isScrolledRef.current) {
        return;
      }

      isScrolledRef.current = nextIsScrolled;
      setIsScrolled(nextIsScrolled);
    };

    const onScroll = () => {
      if (rafIdRef.current !== null) {
        return;
      }
      rafIdRef.current = window.requestAnimationFrame(update);
    };

    // 초기 상태 동기화
    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isEnabled, threshold]);

  return { isScrolled };
};

export default useScroll;
