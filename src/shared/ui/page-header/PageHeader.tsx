import Title from '@/shared/ui/title/Title';

type PageHeaderProps = {
  title: string;
  description?: string;
};

/**
 * 페이지 상단에 페이지 제목, 설명을 표시하는 컴포넌트입니다.
 *
 * description은 선택적으로 페이지 설명을 표시할 수 있습니다.
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
  return (
    <div className="flex flex-col gap-1">
      <Title as="h1" size="18" weight="bold">
        {title}
      </Title>
      {description && <p className="typo-14-medium text-gray-500">{description}</p>}
    </div>
  );
}
