'use client';

import { useEffect, useState } from 'react';
import { CancelIcon, CheckIcon, DeleteIcon, WarningIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';
import type { ToastType } from './types';

const TOAST_DURATION = 3000;

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
 * @param onClose - 토스트가 화면에서 사라진 후, 스토어에서 해당 데이터를 제거하는 콜백 함수
 */
export default function Toast({ type, message, onClose }: ToastProps) {
  const [isClosing, setIsClosing] = useState(false);
  const { icon } = toastIconConfig[type];

  const handleClose = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    const timer = setTimeout(handleClose, TOAST_DURATION);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      role={type === 'cancel' ? 'alert' : 'status'}
      aria-live="polite"
      onTransitionEnd={isClosing ? onClose : undefined}
      className={cn(
        'flex w-full max-w-[min(420px,calc(100vw-2rem))] items-center rounded-full bg-gray-700 px-4 py-3 transition-opacity duration-300 md:px-7',
        isClosing ? 'opacity-0' : 'opacity-100'
      )}
    >
      {icon}
      <span className="ml-3 min-w-0 flex-1 typo-14-medium wrap-break-word text-gray-25 md:typo-16-medium">
        {message}
      </span>
      <button
        type="button"
        onClick={handleClose}
        aria-label="토스트 닫기"
        className="ml-3 shrink-0 cursor-pointer md:ml-5"
      >
        <DeleteIcon className="h-6 w-6 text-gray-100 md:h-8 md:w-8" />
      </button>
    </div>
  );
}
