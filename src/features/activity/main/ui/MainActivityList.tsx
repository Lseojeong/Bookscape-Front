'use client';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import ActivityCard from '@/features/activity/main/ui/activity-card/ActivityCard';
import { cn } from '@/shared/utils/cn';

type ActivityResponse = {
  id: number;
  bannerImageUrl: string;
  title: string;
  reviewCount: number;
  rating: number;
  price: number;
};
type HotActivityListProps = {
  activities: ActivityResponse[];
};

export default function MainActivityList({ activities = [] }: HotActivityListProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const rafRef = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({
    canLeft: false,
    canRight: false,
  });

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, clientWidth, scrollWidth } = el;

    setScrollState((prev) => {
      const next = {
        canLeft: scrollLeft > 5,
        canRight: scrollLeft + clientWidth < scrollWidth - 5,
      };

      // 값이 같으면 리렌더 방지
      if (prev.canLeft === next.canLeft && prev.canRight === next.canRight) {
        return prev;
      }
      return next;
    });
  }, []);
  const handleScrollEvent = () => {
    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      updateScrollState();
      rafRef.current = null;
    });
  };

  useEffect(() => {
    updateScrollState();
  }, [updateScrollState, activities]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    const list = listRef.current;
    if (!el || !list) return;

    const firstCard = list.children[0] as HTMLElement;
    if (!firstCard) return;

    // 카드 width
    const cardWidth = firstCard.clientWidth;

    // gap (flex gap 대응)
    const gap = parseFloat(getComputedStyle(list).gap || '0');

    // 카드 하나의 실제 차지 영역
    const itemWidth = cardWidth + gap;

    // 현재 화면에 보이는 카드 개수 (반응형 자동 대응)
    const visibleCount = Math.max(1, Math.round(el.clientWidth / itemWidth));

    // 이동 거리
    const scrollAmount = itemWidth * visibleCount;

    // 스크롤 끝 보정
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    const nextScrollLeft =
      direction === 'right'
        ? Math.min(el.scrollLeft + scrollAmount, maxScrollLeft)
        : Math.max(el.scrollLeft - scrollAmount, 0);

    el.scrollTo({
      left: nextScrollLeft,
      behavior: 'smooth',
    });
  };

  const showNavigation = scrollState.canLeft || scrollState.canRight;

  const btnBaseStyle =
    'absolute top-1/2 z-10 flex h-13.5 w-13.5 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white shadow-lg transition-opacity hover:bg-gray-50';
  return (
    <section className="flex w-full flex-col gap-5 py-8">
      <h2 className="typo-32-bold text-gray-950">
        🔥 <span className="text-secondary-500">HOT</span> 인기 체험
      </h2>
      <div className="group relative">
        {/* 왼쪽 버튼 */}
        {showNavigation && scrollState.canLeft && (
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className={cn(btnBaseStyle, '-left-5')}
            aria-label="이전"
          >
            <span className="text-2xl">‹</span>
          </button>
        )}
        <div
          ref={scrollRef}
          className="scrollbar-hide overflow-x-auto scroll-smooth pb-4"
          onScroll={handleScrollEvent}
        >
          <ul ref={listRef} className="flex gap-4 md:gap-5 lg:gap-6">
            {activities.map((data) => {
              return (
                <li
                  key={data.id}
                  className="w-[calc((100%-50px*2)/2)] min-w-50 flex-none md:w-[calc((100%-20px*1)/2)] lg:w-[calc((100%-24px*3)/4)]"
                >
                  <Link href={`/activity/${data.id}`}>
                    <ActivityCard data={data} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {/* 오른쪽 버튼 */}
        {showNavigation && scrollState.canRight && (
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className={cn(btnBaseStyle, '-right-5')}
            aria-label="다음"
          >
            <span className="text-2xl">›</span>
          </button>
        )}
      </div>
    </section>
  );
}
