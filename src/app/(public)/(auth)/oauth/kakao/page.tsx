'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { signInWithOauth, signUpWithOauth } from '@/features/auth/apis/oauth';
import { DEFAULT_OAUTH_MODE, isOAuthMode } from '@/features/auth/constants/oauthMode';
import type { OAuthMode } from '@/features/auth/constants/oauthMode';
import { ApiError } from '@/shared/apis/apiError';
import Loading from '@/shared/ui/loading/Loading';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

type Status = 'loading' | 'success' | 'error';

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
  const oauthErrorDescription = searchParams.get('error_description');

  const mode: OAuthMode = useMemo(() => {
    return isOAuthMode(state) ? state : DEFAULT_OAUTH_MODE;
  }, [state]);

  const [status, setStatus] = useState<Status>('loading');
  const [message, setMessage] = useState<string>('');

  const isParamError = Boolean(oauthError) || !code;
  const redirectUri = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}/oauth/kakao`;
  }, []);

  const derivedMessage = useMemo(() => {
    if (message) return message;
    if (oauthError) {
      return oauthErrorDescription
        ? `카카오 인증 오류: ${oauthErrorDescription}`
        : `카카오 인증 오류: ${oauthError}`;
    }
    if (!code) return '인가 코드(code)가 없습니다.';
    return '';
  }, [code, message, oauthError, oauthErrorDescription]);

  useEffect(() => {
    if (hasProcessedRef.current) return;
    if (oauthError) return;
    if (!code) return;

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
      setStatus('loading');
      setMessage('');

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
          setStatus('error');
          setMessage(
            mode === 'signup' ? '카카오 회원가입에 실패했습니다.' : '카카오 로그인에 실패했습니다.'
          );
          return;
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : '요청에 실패했습니다.';
        if (mode === 'signin' && err instanceof ApiError && err.status === 404) {
          window.location.replace(START_SIGNUP_URL);
          return;
        }
        if (mode === 'signup' && isAlreadyRegisteredUserError(errorMessage)) {
          window.location.replace(START_SIGNIN_URL);
          return;
        }
        setStatus('error');
        const fallbackMessage =
          mode === 'signup' ? '카카오 회원가입에 실패했습니다.' : '카카오 로그인에 실패했습니다.';
        const toastMessage =
          !errorMessage || errorMessage === 'UNKNOWN_ERROR' ? fallbackMessage : errorMessage;
        setMessage(toastMessage);
        useToastStore.getState().showToast('cancel', toastMessage);
        return;
      }

      setStatus('success');
      useToastStore
        .getState()
        .showToast(
          'check',
          mode === 'signup' ? '카카오 회원가입이 완료되었습니다.' : '카카오 로그인에 성공했습니다.'
        );
      router.replace(mode === 'signup' ? '/login' : '/');
    };

    void run();
  }, [code, mode, oauthError, redirectUri, router]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-4">
      {isParamError ? (
        <>
          <p className="text-sm text-gray-700">{derivedMessage || '문제가 발생했습니다.'}</p>
          <a className="text-sm underline hover:text-gray-700" href={START_SIGNIN_URL}>
            카카오 로그인 다시 시도
          </a>
        </>
      ) : status === 'loading' ? (
        <>
          <Loading size={20} color="var(--color-gray-700)" />
          <p className="text-sm text-gray-600">
            {mode === 'signup' ? '카카오 회원가입 처리 중…' : '카카오 로그인 처리 중…'}
          </p>
        </>
      ) : status === 'error' ? (
        <>
          <p className="text-sm text-gray-700">{derivedMessage || '문제가 발생했습니다.'}</p>
          <a className="text-sm underline hover:text-gray-700" href={START_SIGNIN_URL}>
            카카오 로그인 다시 시도
          </a>
        </>
      ) : null}
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
