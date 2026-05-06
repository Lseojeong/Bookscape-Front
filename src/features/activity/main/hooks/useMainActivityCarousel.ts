'use client';
import useEmblaCarousel from 'embla-carousel-react';
import { useState, useEffect, useCallback, startTransition } from 'react';
import { useHotActivityData } from '@/features/activity/main/queries/useHotActivityData';

// TODO : 호출 개수 정해야함!
const ACTIVITY_FETCH_LIMIT = 8;

/**
 * 활동 목록 캐러셀 컴포넌트 로직
 */
export default function useMainActivityCarousel() {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  /** 인기 체험 api 호출 */
  const { data: activityData = [] } = useHotActivityData(ACTIVITY_FETCH_LIMIT);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    duration: 30,
    breakpoints: {
      // 버튼 클릭 시 넘어갈 슬라이드 수
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 4 },
    },
  });

  /** 스크롤 버튼 활성화 상태 업데이트 */
  const updateScrollButtons = useCallback(() => {
    if (!emblaApi) return;

    startTransition(() => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    });
  }, [emblaApi]);

  /** 버튼 클릭 이벤트 */
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  /** Embla Carousel 이벤트 리스너 등록 및 초기화 */
  useEffect(() => {
    if (!emblaApi) return;

    // 초기 상태 설정 및 이벤트 바인딩
    updateScrollButtons();

    emblaApi.on('select', updateScrollButtons); // 슬라이드 선택(이동) 시 실행
    emblaApi.on('reInit', updateScrollButtons); // 캐러셀 구조 재설정(데이터 변경 등) 시 실행

    return () => {
      emblaApi.off('select', updateScrollButtons);
      emblaApi.off('reInit', updateScrollButtons);
    };
  }, [emblaApi, updateScrollButtons]);

  /** 비동기 데이터 로드 완료 후 캐러셀 엔진 재시작 */
  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi, activityData]);

  return {
    emblaRef,
    emblaApi,
    activityData,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
  };
}
