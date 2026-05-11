'use client';

import { useEffect, useRef, useState } from 'react';
import ActivityDescription from '@/features/activity/activity-detail/ui/activity-info/ActivityDescription';
import ActivityLocation from '@/features/activity/activity-detail/ui/activity-info/ActivityLocation';
import TabBar from '@/shared/ui/tab-bar/TabBar';
import { cn } from '@/shared/utils/cn';
import ActivityReviews from '../review/ActivityReviews';

type ActivityTabSectionProps = {
  description: string;
  address: string;
  className?: string;
};

const TAB_IDS = {
  DESCRIPTION: 'description',
  LOCATION: 'location',
  REVIEWS: 'reviews',
} as const;

const TABS = [
  { id: TAB_IDS.DESCRIPTION, label: '체험 설명' },
  { id: TAB_IDS.LOCATION, label: '오시는 길' },
  { id: TAB_IDS.REVIEWS, label: '체험 후기' },
];

const HEADER_HEIGHT = {
  sm: 48, // top-12 (모바일)
  md: 80, // top-20 (태블릿/데스크탑)
} as const;

const MD_BREAKPOINT = 768;

// TODO: API 연결 후 제거
const MOCK_REVIEW_DATA = {
  averageRating: 4.2,
  totalCount: 5,
  reviews: [
    {
      id: 1,
      nickname: '김태현',
      rating: 5,
      content:
        '저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극 추천합니다!',
      createdAt: '2023-02-04T00:00:00.000Z',
    },
    {
      id: 2,
      nickname: '조민선',
      rating: 4,
      content: '좋았어요!',
      createdAt: '2023-02-04T00:00:00.000Z',
    },
    {
      id: 3,
      nickname: '강지현',
      rating: 5,
      content: '강사님이 친절해요!',
      createdAt: '2023-02-04T00:00:00.000Z',
    },
  ],
};

/**
 * 체험 상세 탭 섹션 컴포넌트입니다.
 *
 * 체험 설명, 오시는 길, 체험 후기 탭으로 구성됩니다.
 *
 * @remarks
 * 오시는 길 탭의 카카오맵은 스토리북에서 지원되지 않습니다.
 * 실제 동작은 로컬 서버에서 확인해주세요.
 *
 * @example
 * ```tsx
 * <ActivityTabSection description={activity.description} address={activity.address} />
 * ```
 */

export default function ActivityTabSection({
  description,
  address,
  className,
}: ActivityTabSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(TAB_IDS.DESCRIPTION);

  const descriptionRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  // 탭 클릭으로 스크롤 중일 때 IntersectionObserver가 탭 상태 덮어쓰지 않도록 하는 플래그
  const isScrollingRef = useRef(false);
  // sticky 탭바 DOM 참조 (스크롤 위치 계산에 사용)
  const tabBarRef = useRef<HTMLDivElement>(null);

  // 탭 클릭 시 해당 섹션 최상단으로 스크롤 이동
  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current || !tabBarRef.current) return;
    const tabBarHeight = tabBarRef.current.offsetHeight;
    // 최상단에서는 tabbar가 아직 sticky 되기 전이라 getBoundingClientRect().bottom이 부정확함
    // → sticky 고정 위치(HEADER_HEIGHT) + 탭바 높이로 직접 계산
    const stickyTop = window.innerWidth >= MD_BREAKPOINT ? HEADER_HEIGHT.md : HEADER_HEIGHT.sm;
    const offset = stickyTop + tabBarHeight;
    const top = ref.current.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    isScrollingRef.current = true; // scroll 이벤트가 탭 상태 덮어쓰지 않도록 잠금

    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      [TAB_IDS.DESCRIPTION]: descriptionRef,
      [TAB_IDS.LOCATION]: locationRef,
      [TAB_IDS.REVIEWS]: reviewsRef,
    };
    scrollToRef(refs[tabId]);

    // scrollend 이벤트로 스크롤 완료 감지 후 잠금 해제
    window.addEventListener(
      'scrollend',
      () => {
        isScrollingRef.current = false;
      },
      { once: true }
    );
  };

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;

      // requestAnimationFrame 기반 쓰로틀링으로 스크롤 이벤트 실행 빈도 최적화
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        if (isScrollingRef.current) return; // 탭 클릭으로 스크롤 중이면 무시

        const tabBarBottom = tabBarRef.current?.getBoundingClientRect().bottom ?? 0;
        const sections: [string, React.RefObject<HTMLDivElement | null>][] = [
          [TAB_IDS.DESCRIPTION, descriptionRef],
          [TAB_IDS.LOCATION, locationRef],
          [TAB_IDS.REVIEWS, reviewsRef],
        ];

        // 뒤에서부터 순회하여 탭바 하단을 지나친 섹션 중 현재 보이는 섹션을 활성화
        for (let i = sections.length - 1; i >= 0; i--) {
          const [id, ref] = sections[i];
          if (!ref.current) continue;
          const top = ref.current.getBoundingClientRect().top;
          if (top <= tabBarBottom + 10) {
            setActiveTab(id);
            break;
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      // cleanup: 스크롤 이벤트 리스너 및 미완료 애니메이션 프레임 정리
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={cn(className)}>
      <div ref={tabBarRef} className="sticky top-12 layer-header bg-white md:top-20">
        <TabBar
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          tabClassName="flex-1 md:flex-none md:w-32.5"
        />
      </div>
      {/* 체험 설명 */}
      <div ref={descriptionRef}>
        <ActivityDescription description={description} />
        <div className="mt-10 border-b border-gray-100" />
      </div>
      {/* 오시는 길 */}
      <div ref={locationRef}>
        <ActivityLocation address={address} />
        <div className="mt-10 border-b border-gray-100" />
      </div>
      {/* TODO: 체험 후기 */}
      <div ref={reviewsRef}>
        <ActivityReviews
          averageRating={MOCK_REVIEW_DATA.averageRating}
          totalCount={MOCK_REVIEW_DATA.totalCount}
          currentPage={1}
          reviews={MOCK_REVIEW_DATA.reviews}
          onPageChange={() => {}}
        />
      </div>
    </div>
  );
}
