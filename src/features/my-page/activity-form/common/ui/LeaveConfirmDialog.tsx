import ConfirmDialog from '@/shared/ui/dialog/ConfirmDialog';

type LeaveConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirmLeave: () => void;
  confirmText?: string;
};

export default function LeaveConfirmDialog({
  isOpen,
  onClose,
  onConfirmLeave,
  confirmText = '계속 작성하기',
}: LeaveConfirmDialogProps) {
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      title="아직 내용이 저장되지 않았어요."
      description="뒤로 가면 작업한 내용이 사라집니다."
      cancelText="나가기"
      confirmText={confirmText}
      onCancel={onConfirmLeave}
    />
  );
}
