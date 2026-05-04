'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export default function useHorizontalScroll(count: number) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({ canLeft: false, canRight: false });

  // 드래그 상태 관리 변수
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  // 버튼 활성화 상태 업데이트
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setScrollState({
      canLeft: el.scrollLeft > 5,
      canRight: el.scrollLeft + el.clientWidth < el.scrollWidth - 5,
    });
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [updateScrollState, count]);

  // 버튼 클릭 시 이동 로직
  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollTo({
      left: direction === 'right' ? el.scrollLeft + scrollAmount : el.scrollLeft - scrollAmount,
      behavior: 'smooth',
    });
  };

  // 마우스 드래그 핸들러
  const onDragStart = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftStart.current = el.scrollLeft;
    el.style.scrollBehavior = 'auto'; // 드래그 시에는 즉각 반응하게 smooth 해제
    el.style.cursor = 'grabbing';
  };

  const onDragMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5; // 드래그 속도 조절
    el.scrollLeft = scrollLeftStart.current - walk;
  };

  const onDragEnd = () => {
    isDragging.current = false;
    const el = scrollRef.current;
    if (!el) return;
    el.style.scrollBehavior = 'smooth';
    el.style.cursor = 'grab';
  };

  return {
    scrollRef,
    scrollState,
    handleScroll,
    updateScrollState,
    dragEvents: {
      onMouseDown: onDragStart,
      onMouseMove: onDragMove,
      onMouseUp: onDragEnd,
      onMouseLeave: onDragEnd,
    },
  };
}
