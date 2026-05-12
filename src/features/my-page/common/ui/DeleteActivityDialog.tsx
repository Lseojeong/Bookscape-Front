import { useRouter } from 'next/navigation';
import { useDeleteActivity } from '@/features/my-page/common/mutations/useDeleteActivity';
import ConfirmDialog from '@/shared/ui/dialog/ConfirmDialog';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

type DeleteActivityDialogProps = {
  id: number;
  isOpen: boolean;
  onClose: () => void;
};

export default function DeleteActivityDialog({ id, isOpen, onClose }: DeleteActivityDialogProps) {
  const router = useRouter();
  const { mutate: deleteActivity } = useDeleteActivity();
  const { showToast } = useToastStore();

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      title="체험을 삭제하시겠습니까?"
      description="삭제할 경우, 다시 되돌릴 수 없습니다."
      confirmText="삭제하기"
      cancelText="아니오"
      onCancel={onClose}
      onConfirm={() => {
        deleteActivity(id, {
          onSuccess: () => {
            showToast('check', '체험이 삭제되었습니다.');
            router.push('/mypage/activity');
          },
          onError: (error) => {
            const message = error instanceof Error ? error.message : '체험 삭제에 실패했습니다.';
            showToast('cancel', message);
          },
        });
        onClose();
      }}
    />
  );
}
