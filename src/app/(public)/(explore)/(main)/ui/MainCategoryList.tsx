import Link from 'next/link';
import { ArtIcon, FoodIcon, SightseeingIcon, TourIcon, WellbeingIcon } from '@/shared/assets/icons';

const CATEGORY_OPTIONS = [
  { value: '문화 · 예술', label: '문화 · 예술', iconSrc: ArtIcon },
  { value: '식음료', label: '식음료', iconSrc: FoodIcon },
  { value: '투어', label: '투어', iconSrc: TourIcon },
  { value: '관광', label: '관광', iconSrc: SightseeingIcon },
  { value: '웰빙', label: '웰빙', iconSrc: WellbeingIcon },
];

export default function MainCategoryList() {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center">
        <h2 className="grow typo-32-bold text-gray-950">⚡️카테고리</h2>
        <Link
          href="/activities"
          className="inline-flex items-center typo-20-medium text-primary-700"
        >
          전체 보기
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
        </Link>
      </div>

      <ul className="grid grid-cols-6 gap-4 lg:flex lg:justify-between">
        {CATEGORY_OPTIONS.map((category, index) => {
          const Icon = category.iconSrc;
          // 1. 첫 줄 (index 0,1,2): 6칸 중 2칸씩 차지 (3개 배치)
          // 2. 둘째 줄 (index 3,4):
          //    - 4번째 아이템(index 3)에 왼쪽 여백 1칸 부여 (col-start-2)
          //    - 각각 2칸씩 차지
          let gridClasses = 'col-span-2 flex justify-center';
          if (index === 3) gridClasses += ' col-start-2';

          return (
            <li key={category.value} className={gridClasses}>
              <Link
                href={`/activities?category=${encodeURIComponent(category.value)}`}
                className="flex w-full max-w-40 flex-col items-center gap-8 rounded-full border-gray-50 px-5 py-12.5 shadow-drop md:min-w-30"
              >
                <Icon />
                <span className="typo-20-medium text-gray-700">{category.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
