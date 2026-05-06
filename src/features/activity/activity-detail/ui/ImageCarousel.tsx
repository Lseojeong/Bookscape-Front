'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { startTransition, useEffect, useState } from 'react';
import { cn } from '@/shared/utils/cn';

type ImageCarouselProps = {
  images: string[];
};

/**
 * 이미지 캐러셀 컴포넌트입니다.
 *
 * 자동 재생, 무한 루프, dot 네비게이션을 지원합니다.
 *
 * @example
 * ```tsx
 * <ImageCarousel images={['https://...', 'https://...']} />
 * ```
 */
export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
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
    <div ref={emblaRef} className="relative w-full overflow-hidden rounded-3xl">
      <div className="flex">
        {images.map((src, index) => (
          <div key={index} className="relative h-61.25 min-w-0 flex-[0_0_100%] md:h-100">
            <Image src={src} alt={`체험 이미지 ${index + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>
      {/* dot 네비게이션 */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
        <div className="flex gap-2 rounded-full bg-white/30 px-3 py-2 shadow-sm backdrop-blur-md">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`${index + 1}번 이미지로 이동`}
              className={cn(
                'h-2.5 w-2.5 cursor-pointer rounded-full bg-gray-100',
                index === selectedIndex && 'bg-primary-500'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
