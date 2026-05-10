import { useEffect, useState } from 'react';

const DEFAULT_PAGE_SIZE = {
  mobile: 4,
  tablet: 8,
  desktop: 16,
};

type PageSizeConfig = typeof DEFAULT_PAGE_SIZE;

/**
 * 브레이크포인트에 따라 페이지당 노출 아이템 수를 반환하는 훅입니다.
 * 미디어 쿼리 변화를 감지하여 현재 브레이크포인트에 맞는 페이지 크기를 반환합니다.
 *
 * @param pageSize - 브레이크포인트별 페이지 크기 설정 (기본값: mobile 4, tablet 8, desktop 16)
 * @returns 현재 브레이크포인트에 해당하는 페이지 크기
 *
 * @example
 * ```tsx
 * // 기본값 사용
 * const pageSize = usePageSize();
 *
 * // 커스텀 값 사용
 * const pageSize = usePageSize({ mobile: 6, tablet: 4, desktop: 8 });
 * if (pageSize === null) return <Skeleton />;
 * ```
 */
export const usePageSize = (pageSize: PageSizeConfig = DEFAULT_PAGE_SIZE) => {
  const [currentPageSize, setCurrentPageSize] = useState<number | undefined>(undefined);

  const { mobile, tablet, desktop } = pageSize;

  useEffect(() => {
    // window가 없는 서버 환경에서는 동작하지 않도록 방어 로직 추가
    if (typeof window === 'undefined') return;

    const tabletQuery = window.matchMedia('(min-width: 768px)');
    const desktopQuery = window.matchMedia('(min-width: 1024px)');

    const update = () => {
      if (desktopQuery.matches) setCurrentPageSize(desktop);
      else if (tabletQuery.matches) setCurrentPageSize(tablet);
      else setCurrentPageSize(mobile);
    };

    // 초기값 설정
    update();

    //  미디어 쿼리 변화 감지
    tabletQuery.addEventListener('change', update);
    desktopQuery.addEventListener('change', update);

    return () => {
      tabletQuery.removeEventListener('change', update);
      desktopQuery.removeEventListener('change', update);
    };
  }, [mobile, tablet, desktop]);

  return currentPageSize;
};
