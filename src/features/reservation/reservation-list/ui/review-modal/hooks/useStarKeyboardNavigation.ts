'use client';

import { useCallback } from 'react';
import type { KeyboardEvent } from 'react';

const clampRating = (value: number, max: number) => Math.max(0, Math.min(max, Math.round(value)));

export type UseStarKeyboardNavigationParams = {
  max: number;
  rating: number;
  isInteractive: boolean;
  commit: (next: number) => void;
  focusStar: (next: number) => void;
};

/**
 * 별점(라디오 버튼 그룹) 키보드 네비게이션 훅입니다.
 *
 * @remarks
 * - `ArrowLeft/ArrowDown`: 현재 값 - 1
 * - `ArrowRight/ArrowUp`: 현재 값 + 1
 * - `Home`: 1
 * - `End`: max
 * - `Enter/Space`: 현재 버튼(idx) 선택
 *
 * @returns `idx`별로 바인딩할 `onKeyDown` 핸들러 생성 함수
 */
const useStarKeyboardNavigation = ({
  max,
  rating,
  isInteractive,
  commit,
  focusStar,
}: UseStarKeyboardNavigationParams) => {
  return useCallback(
    (idx: number) => (e: KeyboardEvent<HTMLButtonElement>) => {
      if (!isInteractive || e.defaultPrevented) return;

      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = clampRating(rating - 1, max);
        commit(next);
        focusStar(next);
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        const next = clampRating(rating + 1, max);
        commit(next);
        focusStar(next);
        return;
      }

      if (e.key === 'Home') {
        e.preventDefault();
        commit(1);
        focusStar(1);
        return;
      }

      if (e.key === 'End') {
        e.preventDefault();
        commit(max);
        focusStar(max);
        return;
      }

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        commit(idx);
      }
    },
    [commit, focusStar, isInteractive, max, rating]
  );
};

export default useStarKeyboardNavigation;
