import type { ComponentProps } from 'react';
import { cn } from '@/shared/utils/cn';

type FilterButtonProps = ComponentProps<'button'> & {
  isSelected?: boolean;
};

const selectedStyle = 'border-primary-500 bg-primary-100';
const defaultStyle = 'border-gray-200 bg-white hover:bg-gray-50';

/**
 * 목록을 필터링할 때 사용하는 공통 FilterButton 컴포넌트입니다.
 * @example
 * ```tsx
 * <FilterButton isSelected={true} onClick={상태 변경 로직}>
 * 예약 완료
 * </FilterButton>
 * ```
 */
export default function FilterButton({
  children,
  isSelected = false,
  className,
  ...props
}: FilterButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      className={cn(
        // 기본 상태
        'rounded-full px-4 py-2.5 transition-colors',
        'typo-16-medium text-gray-950',
        'border',
        // 선택 상태일 경우
        isSelected ? selectedStyle : defaultStyle,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
