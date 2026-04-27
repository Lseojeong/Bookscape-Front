import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import Button from '@/shared/ui/button/Button';
import ConfirmDialog from '@/shared/ui/overlay/dialog/ConfirmDialog';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Shared/Overlay/Dialog/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본',
  render: () => {
    const ConfirmDialogStory = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>다이얼로그 열기</Button>
          <ConfirmDialog
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="예약을 취소할까요?"
            description="예약 취소 후에는 되돌릴 수 없습니다."
            confirmText="취소하기"
            cancelText="아니오"
          />
        </>
      );
    };

    return <ConfirmDialogStory />;
  },
};

export const WithoutDescription: Story = {
  name: '설명 없는 다이얼로그',
  render: () => {
    const ConfirmDialogStory = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>다이얼로그 열기</Button>
          <ConfirmDialog
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="체험을 삭제할까요?"
            confirmText="삭제"
            cancelText="취소"
          />
        </>
      );
    };

    return <ConfirmDialogStory />;
  },
};

export const CustomActionText: Story = {
  name: '버튼 문구 변경',
  render: () => {
    const ConfirmDialogStory = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>다이얼로그 열기</Button>
          <ConfirmDialog
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="변경사항을 저장할까요?"
            description="저장하지 않으면 입력한 내용이 사라집니다."
            confirmText="저장"
            cancelText="나중에"
            ariaLabel="저장 확인 다이얼로그"
          />
        </>
      );
    };

    return <ConfirmDialogStory />;
  },
};
