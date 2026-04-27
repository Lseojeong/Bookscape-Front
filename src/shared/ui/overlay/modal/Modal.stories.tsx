import type { Meta, StoryObj } from '@storybook/nextjs';
import Button from '@/shared/ui/button/Button';
import ModalHost from '@/shared/ui/overlay/modal/ModalAction';
import useModalStore from '@/shared/ui/overlay/stores/useModalStore';

const meta: Meta<typeof ModalHost> = {
  title: 'Shared/Modal',
  component: ModalHost,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const ModalTest = () => {
      const openModal = useModalStore((s) => s.openModal);
      const closeModal = useModalStore((s) => s.closeModal);

      return (
        <div className="flex flex-col gap-4">
          <ModalHost />
          <Button
            onClick={() =>
              openModal({
                ariaLabel: 'Zustand 모달',
                content: (
                  <div className="flex flex-col gap-4">
                    <p className="typo-16-medium text-gray-950">
                      Zustand + Portal로 렌더링된 모달입니다.
                    </p>
                    <div className="flex justify-end gap-3">
                      <Button theme="secondary" onClick={closeModal}>
                        닫기
                      </Button>
                    </div>
                  </div>
                ),
              })
            }
          >
            모달 열기
          </Button>
        </div>
      );
    };

    return <ModalTest />;
  },
};
