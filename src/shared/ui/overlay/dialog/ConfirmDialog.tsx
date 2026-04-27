'use client';

import Button from '@/shared/ui/button/Button';
import OverlayLayer from '@/shared/ui/overlay/layer/OverlayLayer';
import { cn } from '@/shared/utils/cn';

export type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  /** '네' 버튼 클릭 시 실행할 콜백 */
  onConfirm?: () => void | Promise<void>;
  /** '아니오' 버튼 클릭 시 실행할 콜백 */
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  ariaLabel?: string;
  className?: string;
};

/**
 * ## ConfirmDialog
 *
 * OverlayLayer 기반 '예/아니오' 확인 다이얼로그 컴포넌트입니다.
 *
 * @remarks
 * - `isOpen`/`onClose`로 제어하는 controlled 컴포넌트입니다.
 * - 버튼 클릭 시 먼저 `onClose()`로 닫고, 이후 콜백을 실행합니다.
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <ConfirmDialog
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="예약을 취소하시겠어요?"
 *   description="취소 후에는 기존 예약 정보를 복구할 수 없습니다."
 *   cancelText="아니오"
 *   confirmText="네"
 *   onCancel={() => console.log('cancel')}
 *   onConfirm={async () => {
 *     await cancelReservation();
 *   }}
 * />
 * ```
 */
export default function ConfirmDialog({
  isOpen,
  onClose,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = '네',
  cancelText = '아니오',
  ariaLabel = '확인 다이얼로그',
  className,
}: ConfirmDialogProps) {
  const handleCancel = () => {
    onClose();
    onCancel?.();
  };

  const handleConfirm = async () => {
    onClose();
    await onConfirm?.();
  };

  return (
    <OverlayLayer
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={ariaLabel}
      position="center"
      variant="dialog"
      surfaceClassName="w-80 md:w-100"
      contentClassName="modal-surface-animation rounded-[30px]"
    >
      <div className={cn('flex flex-col items-center gap-4 text-center', className)}>
        <div className="space-y-2">
          <h2 className="typo-18-body-bold text-gray-950 md:typo-20-body-bold">{title}</h2>
          {description ? <p className="typo-14-medium text-gray-600">{description}</p> : null}
        </div>

        <div className="mt-4 flex justify-center gap-3">
          <Button
            theme="secondary"
            size="md"
            className="w-28.25 typo-14-medium"
            onClick={handleCancel}
          >
            {cancelText}
          </Button>
          <Button theme="primary" size="md" className="w-28.25" onClick={handleConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </OverlayLayer>
  );
}
