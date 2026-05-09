import { useEffect, useMemo, useRef } from 'react';

type UseInfiniteScrollParams = {
  enabled?: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage: () => Promise<unknown>;
  root?: globalThis.IntersectionObserverInit['root'];
  rootMargin?: globalThis.IntersectionObserverInit['rootMargin'];
  threshold?: globalThis.IntersectionObserverInit['threshold'];
};

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
