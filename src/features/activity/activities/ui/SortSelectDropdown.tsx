'use client';
import {
  SelectDropdown,
  SelectDropdownContent,
  SelectDropdownItem,
  SelectDropdownTrigger,
  SelectDropdownValue,
} from '@/shared/ui/dropdown/select';

const SORT_OPTIONS = [
  { sort: 'most_reviewed', label: '인기순' },
  { sort: 'price_asc', label: '가격 낮은 순' },
  { sort: 'price_desc', label: '가격 높은 순' },
  { sort: 'latest', label: '최신순' },
];

type SortSelectDropdownProps = {
  sortValue: string;
  onChangeSortValue: (sort: string) => void;
};

/**
 * 체험 목록 정렬 기준을 선택하는 드롭다운 컴포넌트입니다.
 * SORT_OPTIONS 목록을 기반으로 선택지를 렌더링합니다.
 *
 * @param sortValue - 현재 선택된 정렬 값
 * @param onChangeSortValue - 정렬 값 변경 핸들러
 */
export default function SortSelectDropdown({
  sortValue,
  onChangeSortValue,
}: SortSelectDropdownProps) {
  return (
    <>
      <SelectDropdown value={sortValue} onChangeValue={onChangeSortValue} variants="shadow">
        <SelectDropdownTrigger className="ml-auto">
          <SelectDropdownValue
            placeholder="인기순"
            render={(value) => SORT_OPTIONS.find((option) => option.sort === value)?.label}
          />
        </SelectDropdownTrigger>
        <SelectDropdownContent className="right-0 left-auto">
          {SORT_OPTIONS.map((option) => (
            <SelectDropdownItem key={option.sort} value={option.sort}>
              {option.label}
            </SelectDropdownItem>
          ))}
        </SelectDropdownContent>
      </SelectDropdown>
    </>
  );
}
