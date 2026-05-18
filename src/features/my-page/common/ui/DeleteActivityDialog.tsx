'use client';

import { useRouter } from 'next/navigation';
import { useDeleteActivity } from '@/features/my-page/common/mutations/useDeleteActivity';
import { ApiError } from '@/shared/apis/apiError';
import ConfirmDialog from '@/shared/ui/dialog/ConfirmDialog';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

type DeleteActivityDialogProps = {
  id: number;
  isOpen: boolean;
  onClose: () => void;
};

export default function DeleteActivityDialog({ id, isOpen, onClose }: DeleteActivityDialogProps) {
  const router = useRouter();
  const deleteMutation = useDeleteActivity();
  const { showToast } = useToastStore();

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      title="체험을 삭제하시겠습니까?"
      description="삭제할 경우, 다시 되돌릴 수 없습니다."
      confirmText="삭제하기"
      cancelText="아니오"
      closeOnConfirm={false}
      onCancel={onClose}
      onConfirm={async () => {
        if (deleteMutation.isPending) return;
        try {
          await deleteMutation.mutateAsync(id);
          showToast('check', '체험이 삭제되었습니다.');
          onClose();
          router.push('/mypage/activity');
        } catch (error) {
          if (error instanceof ApiError) {
            if (error.status === 401) {
              showToast('cancel', '로그인이 필요합니다.');
              onClose();
              router.push('/login');
              return;
            }

            showToast('cancel', error.message);
            return;
          }

          const message = error instanceof Error ? error.message : '체험 삭제에 실패했습니다.';
          showToast('cancel', message);
        }
      }}
    />
  );
}
