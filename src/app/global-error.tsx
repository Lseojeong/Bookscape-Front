'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import ActionButton from '@/app/ui/ActionButton';
import ErrorLottie from '@/app/ui/ErrorLottie';
import Logo from '@/shared/ui/logo/Logo';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    document.title = 'Bookscape | Internal Server Error';
    Sentry.captureException(error);
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <html lang="ko">
      <body>
        <main className="flex min-h-dvh items-center justify-center bg-primary-500 px-6">
          <div className="flex flex-col items-center text-center">
            <ErrorLottie />
            <div className="h-16">
              <Logo variant="white" className="h-full" />
            </div>
            <p className="mt-4 typo-32-medium text-white">문제가 발생했어요</p>
            <p className="mt-2 typo-16-medium text-primary-50">잠시 후 다시 시도해주세요</p>
            <ActionButton className="mt-6 w-40" onClick={reset}>
              다시 시도
            </ActionButton>
          </div>
        </main>
      </body>
    </html>
  );
}
