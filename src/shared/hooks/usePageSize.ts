import { useEffect, useState } from 'react';

const DEFAULT_PAGE_SIZE = {
  mobile: 4,
  tablet: 8,
  desktop: 16,
};

type PageSizeConfig = typeof DEFAULT_PAGE_SIZE;

/**
 * 브레이크포인트에 따라 페이지당 노출 아이템 수를 반환하는 훅입니다.
 * 윈도우 리사이즈 이벤트를 감지하여 현재 브레이크포인트에 맞는 페이지 크기를 반환합니다.
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
 * ```
 */
export const usePageSize = (pageSize: PageSizeConfig = DEFAULT_PAGE_SIZE) => {
  const [currentPageSize, setCurrentPageSize] = useState(pageSize.mobile);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setCurrentPageSize(pageSize.desktop);
      else if (window.innerWidth >= 768) setCurrentPageSize(pageSize.tablet);
      else setCurrentPageSize(pageSize.mobile);
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [pageSize]);

  return currentPageSize;
};
