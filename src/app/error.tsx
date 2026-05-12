'use client';

import { useEffect } from 'react';
import ActionButton from '@/app/ui/ActionButton';
import ErrorLottie from '@/app/ui/ErrorLottie';
import Logo from '@/shared/ui/logo/Logo';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * 500(Internal Server Error) 발생 시 표시되는 클라이언트 사이드 에러 페이지 컴포넌트입니다.
 *
 * - `error.tsx`는 Next.js App Router의 Error Boundary로 동작합니다.
 * - `reset()`을 호출하면 해당 세그먼트의 렌더링을 재시도합니다.
 *
 * @example
 * <ErrorPage error={error} reset={reset} />
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    document.title = 'Bookscape | Internal Server Error';
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  const handleRetry = () => reset();

  return (
    <main className="flex min-h-dvh items-center justify-center bg-primary-500 px-6">
      <div className="flex flex-col items-center text-center">
        <ErrorLottie />
        <div className="h-16">
          <Logo variant="white" className="h-full" />
        </div>
        <p className="mt-4 typo-32-medium text-white">문제가 발생했어요</p>
        <p className="mt-2 typo-16-medium text-primary-50">잠시 후 다시 시도해주세요</p>
        <ActionButton className="mt-6 w-40" onClick={handleRetry}>
          다시 시도
        </ActionButton>
      </div>
    </main>
  );
}
