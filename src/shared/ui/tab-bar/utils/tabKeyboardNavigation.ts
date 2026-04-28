import type { KeyboardEvent } from 'react';

export const handleTabKeyDown = (
  e: KeyboardEvent<HTMLElement>,
  tabsLength: number,
  currentIndex: number,
  onChange: (index: number) => void
) => {
  let nextIndex: number | null = null;

  // 오른쪽 화살표 키를 누르면 다음 탭으로 이동
  if (e.key === 'ArrowRight') {
    e.preventDefault();
    nextIndex = (currentIndex + 1) % tabsLength;
  }
  // 왼쪽 화살표 키를 누르면 이전 탭으로 이동
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    nextIndex = (currentIndex - 1 + tabsLength) % tabsLength;
  }

  if (nextIndex !== null) {
    onChange(nextIndex);
    // 이동된 탭으로 포커스 이동
    const tablist = e.currentTarget.closest('[role="tablist"]');
    const tabs = tablist?.querySelectorAll('[role="tab"]');
    (tabs?.[nextIndex] as HTMLElement)?.focus();
  }
};
