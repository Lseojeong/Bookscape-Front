import { useEffect, useState } from 'react';

const DEFAULT_DELAY_MS = 200;

/**
 * 로딩 상태가 짧게(기본 200ms 미만) 끝나는 경우 스켈레톤이 깜빡이지 않도록,
 * 일정 시간 이상 로딩이 지속될 때만 `true`를 반환합니다.
 */
export default function useDelayedLoading(isLoading: boolean) {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) return;

    // 로딩이 다시 시작됐을 때 이전 로딩에서 `true`가 남아있을 수 있어, 다음 틱에서 리셋합니다.
    const resetId = setTimeout(() => setShowLoading(false), 0);
    const timeoutId = setTimeout(() => setShowLoading(true), DEFAULT_DELAY_MS);

    return () => {
      clearTimeout(resetId);
      clearTimeout(timeoutId);
    };
  }, [isLoading]);

  // 로딩이 끝나면 즉시 숨김(상태값은 다음 틱에 정리)
  useEffect(() => {
    if (isLoading) return;
    const id = setTimeout(() => setShowLoading(false), 0);
    return () => clearTimeout(id);
  }, [isLoading]);

  return isLoading ? showLoading : false;
}
