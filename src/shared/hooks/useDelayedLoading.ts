import { useEffect, useRef, useState } from 'react';

const DEFAULT_DELAY_MS = 200;

/**
 * 로딩이 시작된 뒤 `delay`(기본 200ms) 이상 지속될 때만 `true`를 반환합니다.
 *
 * @description
 * - 로딩 시작 → `delay` 동안 `false`
 * - `delay` 이후에도 로딩 중이면 `true`
 * - 로딩 종료 → 즉시 `false`
 *
 * @example
 * ```tsx
 * const isSkeletonVisible = useDelayedLoading(isLoading);
 * if (isLoading && !isSkeletonVisible) return null;
 * if (isSkeletonVisible) return <Skeleton />;
 * ```
 */
const useDelayedLoading = (isLoading: boolean, delay: number = DEFAULT_DELAY_MS) => {
  const [isDelayedLoading, setIsDelayedLoading] = useState(false);
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

    if (isLoading) {
      delayTimerRef.current = setTimeout(() => setIsDelayedLoading(true), delay);
      return () => {
        if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
      };
    }

    // 로딩 종료 시 즉시 숨김. (동기 setState는 lint에 걸릴 수 있어 타이머로 넘깁니다.)
    resetTimerRef.current = setTimeout(() => setIsDelayedLoading(false), 0);
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, [delay, isLoading]);

  return isLoading && isDelayedLoading;
};

export default useDelayedLoading;
