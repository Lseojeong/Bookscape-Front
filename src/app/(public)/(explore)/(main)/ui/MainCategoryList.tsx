import Link from 'next/link';
import { ArtIcon, FoodIcon, SightseeingIcon, TourIcon, WellbeingIcon } from '@/shared/assets/icons';

const CATEGORY_OPTIONS = [
  { value: '문화 · 예술', label: '문화 · 예술', iconSrc: ArtIcon },
  { value: '식음료', label: '식음료', iconSrc: FoodIcon },
  { value: '투어', label: '투어', iconSrc: TourIcon },
  { value: '관광', label: '관광', iconSrc: SightseeingIcon },
  { value: '웰빙', label: '웰빙', iconSrc: WellbeingIcon },
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
    <section className="flex flex-col gap-5">
      <div className="flex items-center">
        <h2 className="grow typo-18-bold text-gray-950 md:typo-32-bold">⚡️카테고리</h2>
        <Link
          href="/activities"
          className="hidden items-center typo-20-medium text-primary-700 md:inline-flex"
        >
          전체 보기
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="-translate-y-0.5 rotate-180"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="#4b7997"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
                <Icon className="h-15 w-15 md:h-30 md:w-30" />
                <span className="text-center typo-13-medium text-gray-700 md:typo-20-medium">
                  {category.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
