'use client';

import { MinusIcon, PlusIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

type HeadCountControlProps = {
  headCount: number;
  onDecrease: () => void;
  onIncrease: () => void;
  variant?: 'default' | 'wide';
  rounded?: 'full' | 'xl';
};

/**
 * 참여 인원 수 조절 컴포넌트입니다.
 *
 * `variant`로 레이아웃을, `rounded`로 버튼 모서리 스타일을 제어할 수 있습니다.
 *
 * @example
 * ```tsx
 * <HeadCountControl
 *   headCount={headCount}
 *   onDecrease={() => setHeadCount((prev) => Math.max(1, prev - 1))}
 *   onIncrease={() => setHeadCount((prev) => prev + 1)}
 * />
 * ```
 */
export default function HeadCountControl({
  headCount,
  onDecrease,
  onIncrease,
  variant = 'default',
  rounded = 'full',
}: HeadCountControlProps) {
  return (
    <div
      className={cn(
        'flex items-center',
        variant === 'default' ? 'justify-between' : 'flex-col items-start gap-3'
      )}
    >
      <p className="typo-16-bold text-gray-950">참여 인원 수</p>
      <div
        className={cn(
          'flex items-center gap-3 border',
          rounded === 'full' ? 'rounded-full' : 'rounded-xl',
          variant === 'default'
            ? 'border-gray-50 px-4 py-2'
            : 'h-13 w-full justify-between border-gray-100 px-5'
        )}
      >
        <button
          className="flex h-5 w-5 items-center justify-center typo-16-medium text-gray-700"
          onClick={onDecrease}
        >
          <MinusIcon />
        </button>
        <span className="w-10 text-center typo-16-bold text-gray-800">{headCount}</span>
        <button
          className="flex h-5 w-5 items-center justify-center typo-16-medium text-gray-700"
          onClick={onIncrease}
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}
