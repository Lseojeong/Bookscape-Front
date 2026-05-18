import Image from 'next/image';
import Link from 'next/link';
import {
  ArtIconPng,
  ChevronRightBlueIcon,
  FoodIconPng,
  SightseeingIconPng,
  TourIconPng,
  WellbeingIconPng,
} from '@/shared/assets/icons';
import Title from '@/shared/ui/title/Title';

const CATEGORY_OPTIONS = [
  { value: '문화 · 예술', label: '문화 · 예술', iconSrc: ArtIconPng },
  { value: '식음료', label: '식음료', iconSrc: FoodIconPng },
  { value: '투어', label: '투어', iconSrc: TourIconPng },
  { value: '관광', label: '관광', iconSrc: SightseeingIconPng },
  { value: '웰빙', label: '웰빙', iconSrc: WellbeingIconPng },
];

/**
 * 메인 페이지 카테고리 목록 컴포넌트입니다.
 * 카테고리 아이콘 클릭 시 해당 카테고리 체험 목록 페이지로 이동합니다.
 *
 * @example
 * ```tsx
 * <MainCategoryList />
 * ```
 */
export default function MainCategoryList() {
  return (
    <article className="flex flex-col gap-5">
      <div className="flex items-center">
        <Title as="h2" size="18" weight="bold" className="grow text-gray-950 md:typo-32-bold">
          ⚡️ 카테고리
        </Title>
        <Link
          href="/activities"
          className="inline-flex items-center typo-16-medium text-primary-700 md:typo-20-medium"
        >
          전체 보기
          <span className="flex h-4 w-4 items-center justify-center md:h-6 md:w-6">
            <ChevronRightBlueIcon />
          </span>
        </Link>
      </div>

      <ul className="grid grid-cols-6 gap-4 md:px-15 lg:flex lg:justify-between lg:px-0">
        {CATEGORY_OPTIONS.map((category, index) => {
          const Icon = category.iconSrc;
          // 1. 첫 줄 (index 0,1,2): 6칸 중 2칸씩 차지 (3개 배치)
          // 2. 둘째 줄 (index 3,4):
          let gridClasses = 'col-span-2 flex justify-center';
          if (index === 3) gridClasses += ' col-start-2';

          return (
            <li key={category.value} className={gridClasses}>
              <Link
                href={`/activities?category=${encodeURIComponent(category.value)}`}
                className="flex w-full max-w-30 flex-col items-center gap-5 rounded-full border-gray-50 px-3.5 py-6.25 shadow-drop md:max-w-40 md:min-w-30 md:gap-8 md:px-5 md:py-12.5"
              >
                <Image
                  src={Icon}
                  alt={`${category.label} 아이콘`}
                  width={120}
                  height={120}
                  priority
                  className="h-15 w-15 md:h-30 md:w-30"
                  unoptimized // PNG 원본 유지
                />
                {/* <Icon className="h-15 w-15 md:h-30 md:w-30" /> */}
                <span className="text-center typo-13-medium text-gray-700 md:typo-20-medium">
                  {category.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
