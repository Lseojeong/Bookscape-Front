import FilterButton from '@/shared/ui/filter-button/FilterButton';

const CATEGORY_LIST = ['전체', '문화 · 예술', '식음료', '투어', '관광', '웰빙'];

type CategoryFilterProps = {
  selectedCategory: string;
  onChangeCategory: (category: string) => void;
};

/**
 * 체험 도메인의 카테고리를 필터링하는 컴포넌트입니다.
 * * @example
 * ```tsx
 * import { useState } from 'react';
 * import CategoryFilter from '@/features/activity/ui/CategoryFilter';
 * export default function SearchPage() {
 * const [category, setCategory] = useState('전체');
 * return (
 * <CategoryFilter
 * selectedCategory={category}
 * onChangeCategory={setCategory}
 * />
 * );
 * }
 * ```
 */
export default function CategoryFilter({
  selectedCategory,
  onChangeCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {CATEGORY_LIST.map((category) => (
        <FilterButton
          key={category}
          isSelected={selectedCategory === category}
          onClick={() => onChangeCategory(category)}
        >
          {category}
        </FilterButton>
      ))}
    </div>
  );
}
