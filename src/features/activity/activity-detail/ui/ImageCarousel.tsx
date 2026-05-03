'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { startTransition, useEffect, useState } from 'react';
import { cn } from '@/shared/utils/cn';

/**
 * 이미지 캐러셀 컴포넌트입니다.
 *
 * 자동 재생, 무한 루프, dot 네비게이션을 지원합니다.
 *
 * @example
 * ```tsx
 * <ImageCarousel />
 * ```
 */
export default function ImageCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    startTransition(() => {
      setScrollSnaps(emblaApi.scrollSnapList());
    });

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', () => {
      startTransition(() => {
        setScrollSnaps(emblaApi.scrollSnapList());
      });
    });
  }, [emblaApi]);

  return (
    <div ref={emblaRef} className="relative w-full overflow-hidden">
      {/* Mock 데이터 */}
      <div className="flex">
        {['이미지1', '이미지2', '이미지3'].map((item) => (
          <div key={item} className="h-100 min-w-0 flex-[0_0_100%] bg-gray-200">
            {item}
          </div>
        ))}
      </div>
      {/* dot 네비게이션 */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              'h-2 w-2 cursor-pointer rounded-full',
              index === selectedIndex ? 'bg-gray-700' : 'bg-gray-300'
            )}
          />
        ))}
      </div>
    </div>
  );
}
