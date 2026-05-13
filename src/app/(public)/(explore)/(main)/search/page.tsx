import { Metadata } from 'next';
import MainSectionLayout from '@/app/(public)/(explore)/(main)/ui/MainSectionLayout';
import SearchResultSection from '@/features/activity/search/ui/SearchResultSection';

export const metadata: Metadata = {
  title: '검색 결과',
  // NOTE: 사이트 과부하와 저품질 페이지로 인식될 수 있기 때문에 막음
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * 검색 페이지 컴포넌트입니다.
 * 키워드 기반 검색 결과 목록을 렌더링합니다.
 */
export default function SearchPage() {
  return (
    <>
      <MainSectionLayout className="md:mt-28.75">
        <SearchResultSection />
      </MainSectionLayout>
    </>
  );
}
