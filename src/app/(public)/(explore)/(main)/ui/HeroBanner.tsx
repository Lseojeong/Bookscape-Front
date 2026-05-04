import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import { HeroBannerImage } from '@/shared/assets/images';
import Logo from '@/shared/ui/logo/Logo';
import SearchInput from '@/shared/ui/search-input/SearchInput';
import { cn } from '@/shared/utils/cn';

export default function HeroBanner(props: Omit<ImageProps, 'src' | 'alt'>) {
  return (
    <section className="relative h-105 w-full overflow-visible">
      {/* 배경 이미지 */}
      <Image
        src={HeroBannerImage}
        alt="배너 이미지"
        fill
        priority
        className="object-cover"
        {...props}
      />
      {/* 헤드라인 및 검색 인풋 */}
      <div className="absolute inset-0 mx-auto mt-22 flex max-w-260 flex-col items-center justify-between text-white md:mt-13.25 lg:mt-20.75">
        <div className="flex w-full items-center justify-between">
          <div className="max-w-2xl grow">
            <p className="mb-10.25 typo-16-medium md:mb-6.25">Search</p>
            <p className="mb-10.25 typo-20-medium leading-tight md:mb-8.75 md:typo-32-medium lg:mb-13.25">
              체험을 만들고, 찾고, 예약까지 한 번에
              <br />
              북스케이프에서 경험해보세요!
            </p>
            <Link
              href="/activities"
              aria-label="체험 페이지로 이동"
              className={cn(
                'inline-block w-full rounded-4xl bg-white py-4 text-center typo-13-medium text-primary-700 md:w-86.5 md:typo-20-medium',
                'transition-transform hover:scale-105'
              )}
            >
              지금 바로 체험 보러 가기
            </Link>
          </div>
          <Logo variant="white" className="hidden shrink-0 lg:block lg:w-60" />
        </div>
        <div className="w-full translate-y-1/2">
          <SearchInput />
        </div>
      </div>
    </section>
  );
}
