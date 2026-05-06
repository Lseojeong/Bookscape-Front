'use client';
import useEmblaCarousel from 'embla-carousel-react';
import { useState, useEffect, useCallback, startTransition } from 'react';
import { ActivityData, ActivityResponse } from '@/features/activity/types';
import { get } from '@/shared/apis/base/publicFetch';

// TODO : 호출 개수 정해야함!
const ACTIVITY_FETCH_LIMIT = 8;

/**
 * 활동 목록 캐러셀 컴포넌트 로직
 */
export default function useMainActivityCarousel() {
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    duration: 30, // 낮을수록 빠름 (기본값: 25)

    // 브레이크포인트 옵션 : 모바일은 버튼이 없어서 미작성
    breakpoints: {
      // 768px (md) 이상일 때 적용
      '(min-width: 768px)': {
        slidesToScroll: 2,
      },
      // 1024px (lg) 이상일 때 적용
      '(min-width: 1024px)': {
        slidesToScroll: 4,
      },
    },
  });

  /**
   * [Handler] 스크롤 버튼 활성화 상태 업데이트
   * - Embla API를 통해 이전/다음으로 스크롤이 가능한지 여부를 판단하여 상태를 갱신합니다.
   * - startTransition을 사용하여 버튼 상태 업데이트가 메인 렌더링을 방해하지 않도록 합니다.
   */
  const updateScrollButtons = useCallback(() => {
    if (!emblaApi) return;

    startTransition(() => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    });
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  /**
   * [Effect] 초기 데이터 패칭
   * - 컴포넌트 마운트 시 인기 체험 데이터를 가져옵니다.
   */
  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const result = await get<ActivityResponse>(
          `/activities?method=offset&sort=most_reviewed&size=${ACTIVITY_FETCH_LIMIT}`
        );
        setActivityData(result?.activities ?? []);
      } catch (error) {
        console.error('데이터를 불러오는 중 에러가 발생했습니다:', error);
      }
    };
    fetchActivityData();
  }, []);

  /**
   * [Effect] Embla Carousel 이벤트 리스너 등록
   * - 데이터가 로드되거나 스크롤이 발생할 때마다 버튼 상태를 동기화합니다.
   */
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

  /**
   * [Effect] 데이터 로드 완료 후 캐러셀 재배치
   * - 비동기 데이터(activityData)가 들어오면 Embla가 슬라이드 길이를 다시 계산하도록 합니다.
   */
  useEffect(() => {
    if (emblaApi && activityData.length > 0) {
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
