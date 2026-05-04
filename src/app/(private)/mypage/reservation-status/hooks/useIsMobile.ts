'use client';

import { useSyncExternalStore } from 'react';

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

export default function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
