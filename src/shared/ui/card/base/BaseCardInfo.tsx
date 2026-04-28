import { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

type BaseCardInfoProps = {
  children: ReactNode;
  className?: string;
};

/**
 * 카드의 "정보 영역"을 감싸는 공통 레이아웃 컴포넌트입니다.
 *
 * - 카드 하단의 콘텐츠 영역(UI)을 감싸는 wrapper
 * - 제목, 리뷰, 가격, 액션 버튼 등을 조합하여 구성할 때 사용
 * - 실제 레이아웃(위치, padding 등)은 외부에서 className으로 제어
 *
 * @example
 * ```tsx
 * <BaseCardInfo className="absolute bottom-0 p-4">
 *   <Title />
 *   <Price />
 * </BaseCardInfo>
 * ```
 */
export default function BaseCardInfo({ children, className }: BaseCardInfoProps) {
  return (
    <div className={cn('flex w-full flex-col rounded-[18px] bg-white', className)}>{children}</div>
  );
}
