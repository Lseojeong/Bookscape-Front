import { cn } from '@/shared/utils/cn';

type SkeletonProps = {
  className: string;
};

/**
 * ### Skeleton 컴포넌트
 *
 * 콘텐츠 로딩 중 표시되는 애니메이션 스켈레톤 컴포넌트입니다.
 * Tailwind CSS 유틸리티 클래스를 사용해 크기와 스타일을 지정합니다.
 *
 * @param props - 컴포넌트 props
 * @returns Skeleton 컴포넌트
 *
 * @example
 * ```tsx
 * // 박스형 스켈레톤
 * <Skeleton className="h-24 w-24 rounded-xl" />
 *
 * // 텍스트 라인 스켈레톤
 * <Skeleton className="h-4 w-full rounded-md" />
 *
 * // 원형 아바타 스켈레톤
 * <Skeleton className="h-16 w-16 rounded-full" />
 *
 * // 반응형 스켈레톤
 * <Skeleton className="h-20 w-20 rounded-lg sm:h-36 sm:w-36 sm:rounded-xl" />
 *
 * // 정확한 px 단위가 필요한 경우
 * <Skeleton className="h-[100px] w-[100px] rounded-[24px]" />
 *
 * // 추가 스타일 적용
 * <Skeleton className="h-8 w-1/2 rounded-md bg-gray-300" />
 * ```
 */
export default function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('animate-pulse bg-gray-100 opacity-70', className)} />;
}
