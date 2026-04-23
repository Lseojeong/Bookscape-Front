import type { Meta, StoryObj } from '@storybook/nextjs';
import Logo from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Shared/Logo',
  component: Logo,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 로그인, 회원가입 페이지에서 사용되는 일반 버전 로고
export const Default: Story = {
  args: {
    className: 'w-42 h-10',
  },
};

// 푸터에서 사용되는 일반 버전 로고
export const Footer: Story = {
  args: {
    className: 'w-21 h-5',
  },
};

// 헤더에서 사용되는 화이트 버전 로고
export const Header: Story = {
  render: (args) => (
    <div className="bg-gray-800 p-4">
      {/* 화이트 로고가 잘 보이기 위해 헤더 배경색 추가 */}
      <Logo {...args} />
    </div>
  ),
  args: {
    isWhite: true,
    className: 'w-[118px] h-7',
  },
};
