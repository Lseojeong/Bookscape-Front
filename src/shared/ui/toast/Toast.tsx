'use client';

import { CancelIcon, CheckIcon, DeleteIcon, WarningIcon } from '@/shared/assets/icons';
import { ToastType } from './types';

type ToastProps = {
  type: ToastType;
  message: string;
  onClose: () => void;
};

const toastIconConfig = {
  cancel: { icon: <CancelIcon /> },
  check: { icon: <CheckIcon /> },
  warning: { icon: <WarningIcon /> },
};

/**
 * 작업 결과나 오류를 알려주는 토스트 공통 컴포넌트입니다.
 *
 * cancel, check, warning 세가지 타입이 있으며, 타입에 따라 아이콘이 다르게 표시됩니다.
 *
 * @param type - 토스트 타입 (cancel: 에러, check: 성공, warning: 경고)
 * @param message - 토스트 메시지
 * @param onClose - 닫기 버튼 클릭 시 호출되는 콜백 함수
 *
 * @example
 * ```tsx
 * // 에러
 * <Toast type="cancel" message="작업 중 오류가 발생했습니다." onClose={handleClose} />
 *
 * // 성공
 * <Toast type="check" message="예약이 완료되었습니다." onClose={handleClose} />
 *
 * // 경고
 * <Toast type="warning" message="주의: 이 작업은 되돌릴 수 없습니다." onClose={handleClose} />
 * ```
 */
export default function Toast({ type, message, onClose }: ToastProps) {
  const { icon } = toastIconConfig[type];

  return (
    <div className="flex h-13 items-center rounded-full bg-gray-700 px-7 py-3">
      {icon}
      <span className="ml-3 typo-18-medium text-gray-25">{message}</span>
      <button onClick={onClose} aria-label="토스트 닫기" className="ml-5 cursor-pointer">
        <DeleteIcon className="h-8 w-8 text-gray-100" />
      </button>
    </div>
  );
}
