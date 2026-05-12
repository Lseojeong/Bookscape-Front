'use client';

import { useRouter } from 'next/navigation';
import ActionButton from '@/app/ui/ActionButton';

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
