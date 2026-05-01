'use client';

import { useId, useMemo, useRef, useState } from 'react';
import { StarIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';
import useStarKeyboardNavigation from './hooks/useStarKeyboardNavigation';

/**
 * `Star` 컴포넌트 props입니다.
 *
 * @param value - 선택된 별점(1~max)입니다. 값을 전달하면 controlled로 동작합니다.
 * @param defaultValue - uncontrolled 모드에서 초기 값입니다.
 * @param onChange - 값이 변경될 때 호출됩니다. 인자는 변경된 별점(0~max)입니다.
 * @param max - 별 개수입니다. 기본값은 `5`입니다.
 * @param disabled - 비활성화 상태입니다.
 * @param readOnly - 읽기 전용 상태입니다(클릭/키보드 변경 불가).
 * @param className - 전체 wrapper 클래스입니다.
 * @param size - 각 별 크기(px)입니다. 기본값은 `42`입니다.
 * @param ariaLabel - 접근성 라벨입니다.
 */
export type StarProps = {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  max?: number;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  size?: number;
  ariaLabel?: string;
};

function clampRating(value: number, max: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(max, Math.round(value)));
}

/**
 * ### Star
 *
 * 클릭/키보드로 선택 가능한 별점(기본 5점) 컴포넌트입니다.
 *
 * @remarks
 * - 마우스 클릭으로 선택할 수 있습니다.
 * - 키보드로는 `←/→`(또는 `↑/↓`), `Home/End`, `Space/Enter`로 값 변경이 가능합니다.
 * - `ic-star` 아이콘을 사용하며 색상은 `currentColor`(텍스트 색상)로 제어합니다.
 *
 * @example
 * ```tsx
 * const [rating, setRating] = useState(0);
 *
 * <Star value={rating} onChange={setRating} ariaLabel="별점 선택" />
 * ```
 */
export default function Star({
  value,
  defaultValue = 0,
  onChange,
  max = 5,
  disabled,
  readOnly,
  className,
  size = 42,
  ariaLabel = '별점 선택',
}: StarProps) {
  const groupId = useId();
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [uncontrolledValue, setUncontrolledValue] = useState(() => clampRating(defaultValue, max));

  const isControlled = value !== undefined;
  const rating = clampRating(isControlled ? value : uncontrolledValue, max);
  const isInteractive = !disabled && !readOnly;

  const starIndexes = useMemo(() => Array.from({ length: max }, (_, i) => i + 1), [max]);

  const commit = (next: number) => {
    if (!isInteractive) return;
    const clamped = clampRating(next, max);
    if (!isControlled) setUncontrolledValue(clamped);
    onChange?.(clamped);
  };

  const focusStar = (nextValue: number) => {
    const focusValue = nextValue === 0 ? 1 : nextValue;
    buttonRefs.current[focusValue - 1]?.focus();
  };

  const getKeyDownHandler = useStarKeyboardNavigation({
    max,
    rating,
    isInteractive,
    commit,
    focusStar,
  });

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      className={cn('flex items-center gap-3', className)}
    >
      {starIndexes.map((idx) => {
        const isActive = idx <= rating;
        const inputId = `${groupId}-${idx}`;
        const tabIndex = idx === (rating || 1) ? 0 : -1;

        return (
          <button
            key={idx}
            id={inputId}
            type="button"
            role="radio"
            aria-checked={idx === rating}
            tabIndex={tabIndex}
            disabled={disabled}
            ref={(el) => {
              buttonRefs.current[idx - 1] = el;
            }}
            className={cn(
              'rounded-md transition-colors outline-none',
              isInteractive && 'focus-visible:ring-2 focus-visible:ring-primary-500',
              !isInteractive && 'cursor-default',
              isActive ? 'text-yellow-500' : 'text-gray-200'
            )}
            onClick={() => commit(idx)}
            onKeyDown={getKeyDownHandler(idx)}
          >
            <StarIcon style={{ width: size, height: size }} aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
