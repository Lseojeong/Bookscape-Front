'use client';
import { useState } from 'react';
import {
  SelectDropdown,
  SelectDropdownContent,
  SelectDropdownItem,
  SelectDropdownTrigger,
  SelectDropdownValue,
} from '@/shared/ui/dropdown/select';

const SORT_OPTIONS = [
  { sort: 'most_reviewd', label: '인기순' },
  { sort: 'price_asc', label: '가격 높은 순' },
  { sort: 'price_desc', label: '가격 낮은 순' },
  { sort: 'latest', label: '최신순' },
];

export default function SortSelectDropdown() {
  const [sortValue, setSortValue] = useState();
  return (
    <>
      <SelectDropdown value={sortValue} onChangeValue={setSortValue}>
        <SelectDropdownTrigger>
          <SelectDropdownValue
            placeholder="인기순"
            render={(value) => SORT_OPTIONS.find((option) => option.sort === value)?.label}
          />
        </SelectDropdownTrigger>
        <SelectDropdownContent>
          {SORT_OPTIONS.map((option) => (
            <SelectDropdownItem key={option.sort} value={String(option.sort)}>
              {option.label}
            </SelectDropdownItem>
          ))}
        </SelectDropdownContent>
      </SelectDropdown>
    </>
  );
}
