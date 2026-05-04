import HeroBanner from '@/app/(public)/(explore)/(main)/ui/HeroBanner';
import MainCategoryList from '@/app/(public)/(explore)/(main)/ui/MainCategoryList';

export default function Home() {
  return (
    <div>
      {/* 상단 배너 및 검색 인풋 */}
      <HeroBanner />
      {/* 카테고리 */}
      <div className="mt-28.75 max-w-280 px-7.5 lg:mx-auto lg:px-0">
        <MainCategoryList />
      </div>
      {/* 인기체험 */}
    </div>
  );
}
