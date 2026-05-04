'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import { signInWithOauth, signUpWithOauth } from '@/features/auth/apis/oauth';
import { DEFAULT_OAUTH_MODE, isOAuthMode } from '@/features/auth/constants/oauthMode';
import type { OAuthMode } from '@/features/auth/constants/oauthMode';
import { ApiError } from '@/shared/apis/apiError';
import Loading from '@/shared/ui/loading/Loading';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

const START_SIGNIN_URL = '/api/oauth/kakao/authorization?mode=signin';
const START_SIGNUP_URL = '/api/oauth/kakao/authorization?mode=signup';

const generateTempNickname = () => {
  const rand = Math.random().toString(36).slice(2, 6);
  return `kakao${rand}`;
};

const isAlreadyRegisteredUserError = (message: string) => {
  return message.includes('이미') && (message.includes('등록') || message.includes('가입'));
};

function KakaoOauthCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasProcessedRef = useRef(false);

  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const oauthError = searchParams.get('error');

  const mode: OAuthMode = useMemo(() => {
    return isOAuthMode(state) ? state : DEFAULT_OAUTH_MODE;
  }, [state]);

  const isParamError = Boolean(oauthError) || !code;
  const redirectUri = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}/oauth/kakao`;
  }, []);

  useEffect(() => {
    if (hasProcessedRef.current) return;
    if (isParamError) {
      hasProcessedRef.current = true;
      useToastStore.getState().showToast('cancel', '카카오 로그인에 실패했습니다.');
      router.replace('/login');
      return;
    }

    if (process.env.NODE_ENV !== 'production') {
      // React StrictMode(dev)에서 mount/unmount로 effect가 2번 실행될 수 있어서
      // 동일한 인가 코드로 중복 요청이 나가지 않도록 sessionStorage로 한 번 더 가드한다.
      const processedKey = `oauth:kakao:processed:${code}`;
      try {
        if (sessionStorage.getItem(processedKey)) {
          return;
        }
        sessionStorage.setItem(processedKey, '1');
      } catch {
        // ignore (storage unavailable)
      }
    }

    hasProcessedRef.current = true;

    const run = async () => {
      try {
        const res =
          mode === 'signup'
            ? await signUpWithOauth({
                token: code,
                nickname: generateTempNickname(),
                redirectUri,
              })
            : await signInWithOauth({ token: code, redirectUri });

        if (!res) {
          useToastStore
            .getState()
            .showToast(
              'cancel',
              mode === 'signup'
                ? '카카오 회원가입에 실패했습니다.'
                : '카카오 로그인에 실패했습니다.'
            );
          router.replace(mode === 'signup' ? '/signup' : '/login');
          return;
        }
      } catch (err: unknown) {
        if (mode === 'signin' && err instanceof ApiError && err.status === 404) {
          window.location.replace(START_SIGNUP_URL);
          return;
        }
        const errorMessage = err instanceof Error ? err.message : '';
        if (mode === 'signup' && isAlreadyRegisteredUserError(errorMessage)) {
          window.location.replace(START_SIGNIN_URL);
          return;
        }
        const fallbackMessage =
          mode === 'signup' ? '카카오 회원가입에 실패했습니다.' : '카카오 로그인에 실패했습니다.';
        useToastStore.getState().showToast('cancel', fallbackMessage);
        router.replace(mode === 'signup' ? '/signup' : '/login');
        return;
      }

      useToastStore
        .getState()
        .showToast(
          'check',
          mode === 'signup' ? '카카오 회원가입이 완료되었습니다.' : '카카오 로그인에 성공했습니다.'
        );
      router.replace(mode === 'signup' ? '/login' : '/');
    };

    void run();
  }, [code, isParamError, mode, redirectUri, router]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <Loading size={20} color="var(--color-gray-700)" />
    </div>
  );
}

export default function KakaoOauthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loading size={20} color="var(--color-gray-700)" />
        </div>
      }
    >
      <KakaoOauthCallbackInner />
    </Suspense>
  );
}
