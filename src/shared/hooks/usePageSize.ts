import { useEffect, useState } from 'react';

const DEFAULT_PAGE_SIZE = {
  mobile: 4,
  tablet: 8,
  desktop: 16,
};

type PageSizeConfig = typeof DEFAULT_PAGE_SIZE;

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
