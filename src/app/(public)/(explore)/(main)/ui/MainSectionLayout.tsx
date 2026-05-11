import { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

type MainSectionLayoutProps = {
  children: ReactNode;
  className?: string;
};
/**
 * 메인 페이지 및 검색 페이지에서 공통으로 사용하는 섹션 레이아웃 컴포넌트입니다.
 * 최대 너비, 여백, 패딩 등 공통 레이아웃 스타일을 제공합니다.
 *
 * @example
 * ```tsx
 * <MainSectionLayout className="md:mt-28.75">
 *   <SearchResultSection />
 * </MainSectionLayout>
 * ```
 */
export default function MainSectionLayout({ children, className }: MainSectionLayoutProps) {
  return (
    <section
      className={cn(
        'mx-auto mt-21.5 mb-10 flex max-w-280 flex-col px-6 md:mt-37.5 md:mb-25 md:px-7.5 xl:px-0',
        className
      )}
    >
      {children}
    </section>
  );
}
