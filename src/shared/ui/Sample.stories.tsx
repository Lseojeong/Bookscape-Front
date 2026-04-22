import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import StarIcon from '@/shared/assets/icons/ic-star.svg';

/**
 * 배포 오류 방지를 위한 샘플 버튼 컴포넌트입니다.
 * 프로젝트 초기 설정 시 Chromatic 빌드 테스트를 위해 사용됩니다.
 *
 * @example
 * ```tsx
 * <SampleButton />
 * ```
 */
function SampleButton() {
  return (
    <button className="inline-flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">
      <StarIcon aria-hidden="true" className="size-4" />
      배포 오류 방지 샘플
    </button>
  );
}

const meta: Meta<typeof SampleButton> = {
  title: 'Example/SampleButton',
  component: SampleButton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
