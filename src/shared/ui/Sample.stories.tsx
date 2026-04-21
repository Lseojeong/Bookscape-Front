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
const meta: Meta<typeof Symbol> = {
  title: 'Example/TestButton',
  component: () => (
    <button style={{ backgroundColor: 'orange', padding: '10px' }}>배포 오류 방지 샘플</button>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
