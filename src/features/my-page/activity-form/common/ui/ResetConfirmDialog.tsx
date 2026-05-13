import ConfirmDialog from '@/shared/ui/dialog/ConfirmDialog';

type ResetConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: () => void;
  confirmText?: string;
};

export default function ResetConfirmDialog({
  isOpen,
  onClose,
  onConfirmReset,
  confirmText = '계속 작성하기',
}: ResetConfirmDialogProps) {
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      title="입력 내용을 초기화하시겠어요?"
      description="작성한 내용이 모두 삭제되고 처음 상태로 돌아갑니다."
      cancelText="초기화하기"
      confirmText={confirmText}
      onCancel={onConfirmReset}
    />
  );
}
