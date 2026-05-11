import HeroBanner from '@/app/(public)/(explore)/(main)/ui/HeroBanner';
import MainSectionLayout from '@/app/(public)/(explore)/(main)/ui/MainSectionLayout';
import MainActivityList from '@/features/activity/main/ui/MainActivityList';
import MainCategoryList from '@/features/activity/main/ui/MainCategoryList';

/**
 * 메인 페이지 컴포넌트입니다.
 * 히어로 배너, 카테고리 목록, 체험 목록으로 구성됩니다.
 */
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
