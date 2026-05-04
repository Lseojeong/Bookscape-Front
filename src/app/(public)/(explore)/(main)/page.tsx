import HeroBanner from '@/app/(public)/(explore)/(main)/ui/HeroBanner';
import MainCategoryList from '@/app/(public)/(explore)/(main)/ui/MainCategoryList';
import MainActivityList from '@/features/activity/main/ui/MainActivityList';

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <div className="mt-28.75 flex max-w-280 flex-col gap-13.25 px-7.5 md:gap-28.75 lg:mx-auto lg:px-0">
        <MainCategoryList />
        {/* 인기체험 */}
        <MainActivityList />
      </div>
    </div>
  );
}
