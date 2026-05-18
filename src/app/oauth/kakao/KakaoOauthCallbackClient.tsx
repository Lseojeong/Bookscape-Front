'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import { signInWithOauth, signUpWithOauth } from '@/features/auth/apis/oauth';
import { AUTH_API_MESSAGE } from '@/features/auth/constants/authMessage';
import { DEFAULT_OAUTH_MODE, isOAuthMode } from '@/features/auth/constants/oauthMode';
import type { OAuthMode } from '@/features/auth/constants/oauthMode';
import {
  generateKakaoTempNickname,
  isAlreadyRegisteredKakaoUserError,
  isNotRegisteredKakaoUserError,
  KAKAO_OAUTH_START_SIGNIN_URL,
  KAKAO_OAUTH_START_SIGNUP_URL,
} from '@/features/auth/utils/kakaoOauthClient';
import { ApiError } from '@/shared/apis/apiError';
import { useUserStore } from '@/shared/stores/userStore';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

export default function KakaoOauthCallbackClient() {
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
      useToastStore.getState().showToast('cancel', AUTH_API_MESSAGE.OAUTH.KAKAO.SIGNIN.ERROR);
      router.replace('/login');
      return;
    }

    hasProcessedRef.current = true;

    const run = async () => {
      try {
        const res =
          mode === 'signup'
            ? await signUpWithOauth({
                token: code,
                nickname: generateKakaoTempNickname(),
                redirectUri,
              })
            : await signInWithOauth({ token: code, redirectUri });

        if (!res) {
          useToastStore
            .getState()
            .showToast(
              'cancel',
              mode === 'signup'
                ? AUTH_API_MESSAGE.OAUTH.KAKAO.SIGNUP.ERROR
                : AUTH_API_MESSAGE.OAUTH.KAKAO.SIGNIN.ERROR
            );
          router.replace(mode === 'signup' ? '/signup' : '/login');
          return;
        }

        // 세션 쿠키는 BFF에서 설정되지만, UI 즉시 반영을 위해 user store도 갱신합니다.
        useUserStore.getState().setUser(res.user);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : '';
        if (
          mode === 'signin' &&
          err instanceof ApiError &&
          (err.status === 404 || isNotRegisteredKakaoUserError(errorMessage))
        ) {
          window.location.replace(KAKAO_OAUTH_START_SIGNUP_URL);
          return;
        }
        if (mode === 'signup' && isAlreadyRegisteredKakaoUserError(errorMessage)) {
          window.location.replace(KAKAO_OAUTH_START_SIGNIN_URL);
          return;
        }
        const fallbackMessage =
          mode === 'signup'
            ? AUTH_API_MESSAGE.OAUTH.KAKAO.SIGNUP.ERROR
            : AUTH_API_MESSAGE.OAUTH.KAKAO.SIGNIN.ERROR;
        useToastStore.getState().showToast('cancel', fallbackMessage);
        router.replace(mode === 'signup' ? '/signup' : '/login');
        return;
      }

      useToastStore
        .getState()
        .showToast(
          'check',
          mode === 'signup'
            ? AUTH_API_MESSAGE.OAUTH.KAKAO.SIGNUP.SUCCESS
            : AUTH_API_MESSAGE.OAUTH.KAKAO.SIGNIN.SUCCESS
        );
      router.replace('/');
    };

    void run();
  }, [code, isParamError, mode, redirectUri, router]);

  return null;
}
