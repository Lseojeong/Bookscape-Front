import HeroBanner from '@/app/(public)/(explore)/(main)/ui/HeroBanner';
import MainSectionLayout from '@/app/(public)/(explore)/(main)/ui/MainSectionLayout';
import SearchResultSection from '@/app/(public)/(explore)/(main)/ui/SearchResultSection';

export default function SearchPage() {
  return (
    <>
      {/* 히어로 배너 */}
      <HeroBanner />
      {/* 검색 결과 */}
      <MainSectionLayout className="md:mt-28.75">
        <SearchResultSection />
      </MainSectionLayout>
    </>
  );
}
