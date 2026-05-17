'use client';

import Button from '@/shared/ui/button/Button';
import OverlayLayer from '@/shared/ui/overlay/layer/OverlayLayer';
import Title from '@/shared/ui/title/Title';
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
  /** 확인 버튼 클릭 시 즉시 닫을지 여부 (기본값: true) */
  closeOnConfirm?: boolean;
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
 * - `closeOnConfirm`에 따라 확인 버튼 클릭 시 닫힘 타이밍이 달라질 수 있습니다.
 *   - `true`(기본값): `onClose()`로 먼저 닫은 뒤 `onConfirm`을 실행합니다.
 *   - `false`: `onConfirm` 실행이 끝난 뒤에도 다이얼로그를 유지합니다. (필요 시 `onConfirm`에서 직접 `onClose()` 호출)
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
  closeOnConfirm = true,
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
    if (closeOnConfirm) onClose();
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
      contentClassName="dialog-surface-animation rounded-[30px]"
    >
      <div className={cn('flex flex-col items-center gap-4 text-center', className)}>
        <div className="space-y-2">
          <Title
            as="h2"
            size="18"
            weight="bold"
            color="text-gray-950"
            className="typo-18-body-bold md:typo-20-body-bold"
          >
            {title}
          </Title>
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
