'use client';

import { useSyncExternalStore } from 'react';

/** 모바일 기준 최대 너비 (px). 이 값 미만이면 모바일로 판단합니다. */
const MD_BREAKPOINT = 1024;

function subscribe(callback: () => void) {
  const mql = window.matchMedia(`(max-width: ${MD_BREAKPOINT - 1}px)`);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getSnapshot() {
  return window.matchMedia(`(max-width: ${MD_BREAKPOINT - 1}px)`).matches;
}

function getServerSnapshot() {
  return false;
}
/**
 * 현재 뷰포트가 모바일인지 여부를 반환하는 훅.
 *
 * - 뷰포트 너비가 `{@link MD_BREAKPOINT}px` 미만이면 `true`를 반환합니다.
 * - `useSyncExternalStore`를 사용하므로 리사이즈 시 즉시 리렌더링됩니다.
 * - SSR 환경에서는 hydration 불일치를 방지하기 위해 초기값을 `false`로 고정합니다.
 *
 * @returns 모바일 여부 (`true`: 모바일, `false`: 데스크톱)
 *
 * @example
 * ```tsx
 * const isMobile = useIsMobile();
 * return isMobile ? <MobileLayout /> : <DesktopLayout />;
 * ```
 */
export default function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
