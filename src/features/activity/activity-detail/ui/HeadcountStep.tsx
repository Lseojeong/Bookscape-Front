'use client';

import { BackIcon } from '@/shared/assets/icons';
import HeadCountControl from './HeadCountControl';

type HeadcountStepProps = {
  headCount: number;
  onBack: () => void;
  onDecrease: () => void;
  onIncrease: () => void;
};

/**
 * 예약 인원을 선택하는 스텝 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <HeadcountStep
 *   headCount={headCount}
 *   onBack={() => setStep('schedule')}
 *   onDecrease={() => setHeadCount((prev) => Math.max(1, prev - 1))}
 *   onIncrease={() => setHeadCount((prev) => prev + 1)}
 * />
 * ```
 */
export default function HeadcountStep({
  headCount,
  onBack,
  onDecrease,
  onIncrease,
}: HeadcountStepProps) {
  return (
    <div className="py-6">
      {/* 헤더 */}
      {/* PageHeader는 h1을 사용해 SEO에 영향을 주므로 직접 구현 */}
      <div className="mb-2 flex items-center gap-3">
        <button onClick={onBack}>
          <BackIcon className="h-6 w-6" />
        </button>
        <p className="typo-20-bold text-gray-950">인원</p>
      </div>
      <p className="mb-8 typo-16-medium text-gray-500">예약할 인원을 선택해주세요.</p>
      {/* 참여 인원 수 */}
      <HeadCountControl
        headCount={headCount}
        onDecrease={onDecrease}
        onIncrease={onIncrease}
        rounded="xl"
      />
    </div>
  );
}
