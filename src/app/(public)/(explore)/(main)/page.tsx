import HeroBanner from '@/app/(public)/(explore)/(main)/ui/HeroBanner';
import MainCategoryList from '@/app/(public)/(explore)/(main)/ui/MainCategoryList';
import MainActivityList from '@/features/activity/main/ui/MainActivityList';

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <div className="mx-auto mt-21.5 mb-10 flex max-w-280 flex-col gap-13.25 px-6 md:mt-37.5 md:mb-25 md:gap-28.75 md:px-7.5 xl:px-0">
        <MainCategoryList />
        <MainActivityList />
      </div>
    </div>
  );
}
