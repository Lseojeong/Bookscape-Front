'use client';

import { BackIcon } from '@/shared/assets/icons';
import Title from '@/shared/ui/title/Title';

type PageHeaderProps = {
  title: string; // 타이틀
  description?: string; // 설명
  onBack: () => void;
};

/**
 * 페이지 상단에 백버튼과 페이지 제목, 설명을 표시하는 컴포넌트입니다.
 *
 * description은 선택적으로 페이지 설명을 표시할 수 있습니다.
 * 백버튼 클릭 시 동작은 onBack prop으로 외부에서 처리합니다.
 *
 * @param title - 페이지 제목
 * @param description - 페이지 설명 (선택)
 * @param onBack - 백버튼 클릭 시 호출되는 콜백 함수
 *
 * @example
 * ```tsx
 * // 일반 페이지
 * <PageHeader
 *   title="체험활동"
 *   description="체험을 탐색하고 예약할 수 있습니다."
 *   onBack={() => router.back()}
 * />
 *
 * // 내 체험 등록/수정 (확인 모달 떠야할 때)
 * <PageHeader
 *   title="내 체험 등록"
 *   onBack={() => setIsModalOpen(true)}
 * />
 * ```
 */
export default function PageHeader({ title, description, onBack }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <button type="button" onClick={onBack} aria-label="이전 페이지로 이동">
          <BackIcon />
        </button>
        <Title as="h1" size="18" weight="bold">
          {title}
        </Title>
      </div>
      {description && <p className="pl-1.5 typo-14-medium text-gray-500">{description}</p>}
    </div>
  );
}
