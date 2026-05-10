import HeroBanner from '@/app/(public)/(explore)/(main)/ui/HeroBanner';
import MainCategoryList from '@/app/(public)/(explore)/(main)/ui/MainCategoryList';
import MainSectionLayout from '@/app/(public)/(explore)/(main)/ui/MainSectionLayout';
import MainActivityList from '@/features/activity/main/ui/MainActivityList';

export default function MainPage() {
  return (
    <>
      <HeroBanner />
      <MainSectionLayout className="gap-13.25 md:gap-28.75">
        <MainCategoryList />
        <MainActivityList />
      </MainSectionLayout>
    </>
  );
}
