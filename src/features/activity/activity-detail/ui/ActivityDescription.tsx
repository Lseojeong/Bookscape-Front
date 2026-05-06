import Title from '@/shared/ui/title/Title';

type ActivityDescriptionProps = {
  description: string;
};

/**
 * 체험 설명 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <ActivityDescription description={activity.description} />
 * ```
 */
export default function ActivityDescription({ description }: ActivityDescriptionProps) {
  return (
    <div className="mt-5 md:mt-7.5">
      <Title as="h2" size="16" weight="bold" color="text-gray-950" className="mb-2 md:typo-18-bold">
        체험 설명
      </Title>
      <p className="typo-16-body-medium text-gray-950">{description}</p>
    </div>
  );
}
