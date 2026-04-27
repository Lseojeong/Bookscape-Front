import type { Meta, StoryObj } from '@storybook/nextjs';
import OverlaySurface from '@/shared/ui/overlay/primitives/OverlaySurface';

const meta: Meta<typeof OverlaySurface> = {
  title: 'Shared/OverlaySurface',
  component: OverlaySurface,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-100">
        <div className="p-8">
          <p className="typo-16-medium text-gray-700">
            OverlaySurface는 fixed 레이어로 렌더링됩니다.
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    position: {
      control: 'select',
      options: ['center', 'bottom', 'right'],
    },
    variant: {
      control: 'select',
      options: ['dialog', 'sheet', 'panel'],
    },
    tone: {
      control: 'select',
      options: ['surface', 'transparent'],
    },
    elevation: {
      control: 'select',
      options: ['card', 'none'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CenterDialog: Story = {
  name: '중앙 다이얼로그',
  args: {
    position: 'center',
    variant: 'dialog',
    tone: 'surface',
    elevation: 'card',
    children: (
      <div className="p-8">
        <h2 className="mb-3 typo-18-bold text-gray-950">중앙 다이얼로그</h2>
        <p className="typo-14-medium text-gray-600">
          확인, 알림, 짧은 입력에 사용하는 중앙 표면입니다.
        </p>
      </div>
    ),
  },
};

export const BottomSheet: Story = {
  name: '하단 시트',
  args: {
    position: 'bottom',
    variant: 'sheet',
    tone: 'surface',
    elevation: 'card',
    children: (
      <div className="p-8">
        <h2 className="mb-3 typo-18-bold text-gray-950">하단 시트</h2>
        <p className="typo-14-medium text-gray-600">
          모바일 선택지나 보조 액션 목록에 사용하는 하단 표면입니다.
        </p>
      </div>
    ),
  },
};

export const RightPanel: Story = {
  name: '오른쪽 패널',
  args: {
    position: 'right',
    variant: 'panel',
    tone: 'surface',
    elevation: 'card',
    children: (
      <div className="p-8">
        <h2 className="mb-3 typo-18-bold text-gray-950">오른쪽 패널</h2>
        <p className="typo-14-medium text-gray-600">
          상세 정보, 필터, 편집 폼처럼 긴 콘텐츠에 사용하는 패널입니다.
        </p>
      </div>
    ),
  },
};

export const TransparentDialog: Story = {
  name: '투명 다이얼로그',
  args: {
    position: 'center',
    variant: 'dialog',
    tone: 'transparent',
    elevation: 'none',
    children: (
      <div className="rounded-24 bg-white p-8 shadow-card">
        <h2 className="mb-3 typo-18-bold text-gray-950">커스텀 표면</h2>
        <p className="typo-14-medium text-gray-600">
          내부 콘텐츠에서 배경과 그림자를 직접 제어하는 예시입니다.
        </p>
      </div>
    ),
  },
};
