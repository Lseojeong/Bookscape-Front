'use client';

import { useEffect, useRef, useState } from 'react';
import TabBar from '@/shared/ui/tab-bar/TabBar';
import { cn } from '@/shared/utils/cn';
import ActivityDescription from './ActivityDescription';
import ActivityLocation from './ActivityLocation';

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

    // smooth scroll 완료 후 잠금 해제
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
      <div ref={reviewsRef} />
    </div>
  );
}
