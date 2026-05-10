'use client';

import { useId } from 'react';
import type { ReactNode } from 'react';
import BaseDropdown from '@/shared/ui/dropdown/base/BaseDropdown';
import BaseDropdownProvider from '@/shared/ui/dropdown/base/BaseDropdownProvider';
import { SelectContext } from '@/shared/ui/dropdown/context/selectContext';
import type { SelectContextType } from '@/shared/ui/dropdown/context/selectContext';
import { useFormField } from '@/shared/ui/form/FormField';

type SelectDropdownProps<T = string> = {
  children: ReactNode;
  value: T;
  onChangeValue: (value: T) => void;
  triggerId?: string;
  variants?: 'basic' | 'shadow';
};

/**
 * SelectDropdown
 *
 * @description
 * SelectDropdown의 루트 컴포넌트입니다.
 *
 * - 선택 값(value)과 변경 핸들러를 제어하는 controlled 컴포넌트입니다.
 * - SelectContext를 통해 value / triggerId / variants를 하위 컴포넌트에 제공합니다.
 * - BaseDropdownProvider를 통해 드롭다운의 open 상태를 관리합니다.
 * - 내부적으로 BaseDropdown을 사용하여 외부 클릭 시 드롭다운을 닫습니다.
 *
 * @param children - SelectDropdownTrigger, SelectDropdownContent 등의 조합 컴포넌트
 * @param value - 현재 선택된 값
 * @param onChangeValue - 선택 값 변경 핸들러
 * @param triggerId - 트리거 버튼에 사용할 id (미지정 시 자동 생성)
 * @param variants - 드롭다운 스타일 variants ('basic' | 'shadow')
 *
 * @example
 * ```tsx
 *   <SelectDropdown
 *     triggerId="category-filter"
 *     value={value}
 *     onChangeValue={setValue}>
 *     <SelectDropdownTrigger>
 *       <SelectDropdownValue
 *         placeholder="카테고리 선택"
 *         render={(value) =>
 *           CATEGORY_OPTIONS.find((opt) => opt.value === value)?.label}/>
 *     </SelectDropdownTrigger>
 *     <SelectDropdownContent>
 *       {CATEGORY_OPTIONS.map((opt) => (
 *         <SelectDropdownItem key={opt.value} value={opt.value}>
 *           {opt.label}
 *         </SelectDropdownItem>
 *       ))}
 *     </SelectDropdownContent>
 *   </SelectDropdown>
 * ```
 */
export default function SelectDropdown<T = string>({
  children,
  value,
  onChangeValue,
  triggerId: triggerIdProp,
  variants = 'basic',
}: SelectDropdownProps<T>) {
  const autoId = useId();
  const formField = useFormField();
  const triggerId = triggerIdProp ?? formField?.id ?? `select-trigger-${autoId}`;

  return (
    <SelectContext
      value={{ value, setValue: onChangeValue, triggerId, variants } as SelectContextType<unknown>}
    >
      <BaseDropdownProvider>
        <BaseDropdown className="w-full">{children}</BaseDropdown>
      </BaseDropdownProvider>
    </SelectContext>
  );
}
