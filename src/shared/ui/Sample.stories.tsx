import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
    // TODO: Tailwind CSS 설정 완료 후 클래스 네임으로 교체 예정
    <button style={{ backgroundColor: 'orange', padding: '10px', color: 'white' }}>
      배포 오류 방지 샘플
    </button>
  );
}

const meta: Meta<typeof SampleButton> = {
  title: 'Example/TestButton',
  component: SampleButton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
