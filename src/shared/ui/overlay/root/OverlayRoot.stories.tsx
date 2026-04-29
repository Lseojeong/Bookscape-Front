import type { Meta, StoryObj } from '@storybook/nextjs';
import Button from '@/shared/ui/button/Button';
import OverlayRoot from '@/shared/ui/overlay/root/OverlayRoot';
import useOverlayStore from '@/shared/ui/overlay/stores/useOverlayStore';

const meta: Meta<typeof OverlayRoot> = {
  title: 'Shared/Overlay/OverlayRoot',
  component: OverlayRoot,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const OverlayRootTest = () => {
      const openOverlay = useOverlayStore((s) => s.openOverlay);
      const closeOverlay = useOverlayStore((s) => s.closeOverlay);

      return (
        <div className="flex flex-col gap-4">
          <OverlayRoot />
          <Button
            onClick={() =>
              openOverlay({
                ariaLabel: 'Zustand 모달',
                content: (
                  <div className="flex flex-col gap-4">
                    <p className="typo-16-medium text-gray-950">
                      Zustand + Portal로 렌더링된 모달입니다.
                    </p>
                    <div className="flex justify-end gap-3">
                      <Button theme="secondary" onClick={closeOverlay}>
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

    return <OverlayRootTest />;
  },
};
