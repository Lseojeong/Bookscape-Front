'use client';

import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';
import Toast from './Toast';

/**
 * 전역 토스트 목록을 화면 하단 중앙에 렌더링하는 컴포넌트입니다.
 */
export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed right-0 bottom-10 left-0 layer-toast flex justify-center px-4 md:justify-end md:px-10">
      <div className="flex flex-col gap-2 md:w-auto md:items-end">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}
