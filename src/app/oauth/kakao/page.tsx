import { Suspense } from 'react';
import KakaoOauthCallbackClient from '@/app/oauth/kakao/KakaoOauthCallbackClient';
import Loading from '@/shared/ui/loading/Loading';

export default function KakaoOauthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loading size={20} color="var(--color-gray-700)" />
        </div>
      }
    >
      <KakaoOauthCallbackClient />
    </Suspense>
  );
}
