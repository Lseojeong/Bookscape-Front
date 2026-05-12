'use client';

import { cva, VariantProps } from 'class-variance-authority';
import { RefObject } from 'react';
import { CaretDownIcon } from '@/shared/assets/icons';
import { WithChildren } from '@/shared/types/common';
import useDropdownBaseContext from '@/shared/ui/dropdown/hooks/useDropdownBaseContext';
import useSelectContext from '@/shared/ui/dropdown/hooks/useSelectDropdownContext';
import { cn } from '@/shared/utils/cn';

const selectDropdownTriggerVariants = cva('flex min-w-0 items-center', {
  variants: {
    variants: {
      basic: 'field-surface w-full justify-between rounded-2xl px-4 h-13.5',
      shadow: 'field-surface gap-4 shadow rounded-lg px-4 py-2 typo-16-medium',
    },
  },
  defaultVariants: {
    variants: 'basic',
  },
});

type SelectDropdownTriggerProps = WithChildren &
  VariantProps<typeof selectDropdownTriggerVariants> & {
    /** 트리거 버튼에 적용할 추가 스타일 클래스 */
    className?: string;
    /** Label 클릭 시 트리거에 포커스를 이동시키는 UX를 위해 사용 */
    ref?: RefObject<HTMLButtonElement | null>;
    /** 외부 label과 연결하는 접근성 식별자 */
    ariaLabelledBy?: string;
    /** 에러 상태일 때 스타일 적용 (드롭다운이 닫힌 상태에서만) */
    isError?: boolean;
  };

/**
 * SelectDropdownTrigger
 *
 * @description
 * SelectDropdown의 트리거 역할을 하는 버튼 컴포넌트입니다.
 *
 * - 클릭 시 드롭다운의 open / close 상태를 토글합니다.
 * - SelectDropdownValue를 자식으로 받아 현재 선택된 값을 표시합니다.
 * - 화살표 아이콘은 open 상태에 따라 회전합니다.
 *
 * @example
 * ```tsx
 * <SelectDropdownTrigger>
 *   <SelectDropdownValue placeholder='카테고리 입력' />
 * </SelectDropdownTrigger>
 * ```
 */
export default function SelectDropdownTrigger({
  children,
  ref,
  className,
  ariaLabelledBy,
  isError,
}: SelectDropdownTriggerProps) {
  const { isOpen, setIsOpen } = useDropdownBaseContext();
  const { triggerId, variants } = useSelectContext();

  return (
    <button
      ref={ref}
      id={triggerId}
      aria-labelledby={ariaLabelledBy}
      type="button"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      className={cn(
        selectDropdownTriggerVariants({ variants }),
        isError && !isOpen && 'border-error',
        className
      )}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <span className="min-w-0 flex-1 overflow-hidden text-left">{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          'inline-flex size-7 shrink-0 items-center justify-center transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      >
        <CaretDownIcon className="block size-5" />
      </span>
    </button>
  );
}
