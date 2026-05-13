'use client';

import { useRouter } from 'next/navigation';
import ActionButton from '@/app/ui/ActionButton';

/**
 * 404 페이지에서 '이전 페이지로', '홈으로' 이동하는 액션 버튼 그룹 컴포넌트입니다.
 *
 * @example
 * <NotFoundActions />
 */
export default function NotFoundActions() {
  const router = useRouter();

  return (
    <div className="mt-10 flex gap-3">
      <ActionButton
        className="w-40"
        onClick={() => {
          router.back();
        }}
      >
        이전 페이지로
      </ActionButton>
      <ActionButton className="w-40" href="/">
        홈으로
      </ActionButton>
    </div>
  );
}
