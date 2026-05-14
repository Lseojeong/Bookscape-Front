import { Metadata } from 'next';
import MainSectionLayout from '@/app/(public)/(explore)/(main)/ui/MainSectionLayout';
import MainActivityList from '@/features/activity/main/ui/MainActivityList';
import MainCategoryList from '@/features/activity/main/ui/MainCategoryList';

export const metadata: Metadata = {
  title: { absolute: '북스케이프 | 탐색이 머무는 곳, 경험이 펼쳐지는 지도' },
  description: '요가, 도자기, 베이킹까지 북스케이프에서 나만의 특별한 체험를 예약하세요.',
  openGraph: {
    title: '북스케이프 | 탐색이 머무는 곳, 경험이 펼쳐지는 지도',
    description: '요가, 도자기, 베이킹까지 북스케이프에서 나만의 특별한 체험를 예약하세요.',
  },
};

/**
 * 메인 페이지 컴포넌트입니다.
 * 카테고리 목록, 체험 목록으로 구성됩니다.
 */
export default function MainPage() {
  return (
    <>
      <MainSectionLayout className="gap-13.25 md:gap-28.75">
        <MainCategoryList />
        <MainActivityList />
      </MainSectionLayout>
    </>
  );
}
