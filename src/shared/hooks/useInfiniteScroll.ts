import { useEffect, useMemo, useRef } from 'react';

/**
 * ## useInfiniteScroll
 *
 * @description
 * IntersectionObserver 기반의 무한 스크롤 훅입니다.
 * 화면(또는 지정한 root) 하단에 렌더한 "센티넬(sentinel)" 요소가 뷰포트에 들어오면 `fetchNextPage`를 호출합니다.
 *
 * @example
 * ```tsx
 * const { setSentinel } = useInfiniteScroll({
 *   enabled: query.isSuccess && !query.isFetchNextPageError,
 *   hasNextPage: query.hasNextPage,
 *   isFetchingNextPage: query.isFetchingNextPage,
 *   fetchNextPage: query.fetchNextPage,
 * });
 *
 * return <div ref={setSentinel} />;
 * ```
 *
 * @remarks
 * - `enabled`, `hasNextPage`, `isFetchingNextPage`를 통해 중복 호출/불필요 호출을 방지합니다.
 * - `rootMargin`을 통해 화면 하단에 닿기 전에 미리 prefetch 할 수 있습니다.
 */
type UseInfiniteScrollParams = {
  /** 무한 스크롤 동작 여부 */
  enabled?: boolean;
  /** 다음 페이지 존재 여부 */
  hasNextPage?: boolean;
  /** 다음 페이지 로딩 중 여부 */
  isFetchingNextPage?: boolean;
  /** 다음 페이지 로드 함수 */
  fetchNextPage: () => Promise<unknown>;
  /** 관찰 기준(root). 기본값은 viewport(null) */
  root?: globalThis.IntersectionObserverInit['root'];
  /** 관찰 root 경계 확장 영역 */
  rootMargin?: globalThis.IntersectionObserverInit['rootMargin'];
  /** 교차 비율 기준 */
  threshold?: globalThis.IntersectionObserverInit['threshold'];
};

/**
 * 센티넬 DOM을 관찰해서 조건에 맞으면 다음 페이지를 가져옵니다.
 *
 * @returns `setSentinel` - 센티넬 요소의 `ref`로 전달할 콜백
 */
export const useInfiniteScroll = ({
  enabled = true,
  hasNextPage = false,
  isFetchingNextPage = false,
  fetchNextPage,
  root = null,
  rootMargin = '0px 0px 160px 0px',
  threshold = 0.1,
}: UseInfiniteScrollParams) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const setSentinel = (node: HTMLDivElement | null) => {
    sentinelRef.current = node;
  };

  const intersectionOptions = useMemo<globalThis.IntersectionObserverInit>(() => {
    return { root, rootMargin, threshold };
  }, [root, rootMargin, threshold]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry?.isIntersecting) return;
      if (!enabled) return;
      if (!hasNextPage) return;
      if (isFetchingNextPage) return;
      void fetchNextPage();
    }, intersectionOptions);

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, fetchNextPage, hasNextPage, intersectionOptions, isFetchingNextPage]);

  return { setSentinel };
};
