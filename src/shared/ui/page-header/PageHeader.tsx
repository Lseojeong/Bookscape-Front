'use client';

import { useRouter } from 'next/navigation';
import { BackIcon } from '@/shared/assets/icons';
import Title from '@/shared/ui/title/Title';

type PageHeaderProps = {
  title: string; // 타이틀
  description?: string; // 설명
};

/**
 * 페이지 상단에 백버튼과 페이지 제목, 설명을 표시하는 컴포넌트입니다.
 *
 * description은 선택적으로 페이지 설명을 표시할 수 있습니다.
 * 백버튼 클릭 시 이전 페이지로 이동합니다.
 *
 * @param title - 페이지 제목
 * @param description - 페이지 설명 (선택)
 *
 * @example
 * ```tsx
 * <PageHeader
 *   title="체험활동"
 *   description="체험을 탐색하고 예약할 수 있습니다."
 * />
 * ```
 */
export default function PageHeader({ title, description }: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <button onClick={() => router.back()} aria-label="이전 페이지로 이동">
          <BackIcon />
        </button>
        <Title as="h2" size="18" weight="bold">
          {title}
        </Title>
      </div>
      {description && <p className="pl-1.5 typo-14-medium text-gray-500">{description}</p>}
    </div>
  );
}
