'use client';

import type { MouseEvent } from 'react';
import { DeleteIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

/**
 * 아이템 삭제 기능을 수행하는 x 아이콘 버튼 컴포넌트입니다.
 * 외부에서 className을 주입받아 위치와 여백을 자유롭게 조정할 수 있습니다.
 *
 * @example
 * ```tsx
 * <DeleteButton
 *   className="absolute -right-1 -top-1 layer-base"
 *   onClick={(e) => {
 *     e.preventDefault();
 *     onRemove(idx);
 *   }}
 * />
 * ```
 */
type DeleteButtonProps = {
  className?: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function DeleteButton({ className, onClick }: DeleteButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-5 w-5 items-center justify-center rounded-full bg-gray-950 text-white md:h-6.5 md:w-6.5',
        className
      )}
      aria-label="이미지 삭제"
    >
      <DeleteIcon className="h-4 w-4 md:h-5 md:w-5" />
    </button>
  );
}
