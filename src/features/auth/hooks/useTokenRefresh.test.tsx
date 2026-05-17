import { renderHook, act } from '@testing-library/react';
import { refreshAuthTokens } from '@/features/auth/apis/auth';
import { useTokenRefresh } from '@/features/auth/hooks/useTokenRefresh';
import { ApiError } from '@/shared/apis/apiError';
import { useUserStore } from '@/shared/stores/userStore';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

jest.mock('@/features/auth/apis/auth', () => ({
  refreshAuthTokens: jest.fn(),
}));

const mockRefreshAuthTokens = jest.mocked(refreshAuthTokens);

const flushPromises = async () => {
  await Promise.resolve();
  await Promise.resolve();
};

describe('useTokenRefresh', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-05-13T00:00:00.000Z'));

    useUserStore.setState(
      {
        user: undefined,
        accessTokenExpiresAt: undefined,
        sessionEndReason: undefined,
        hasHydrated: false,
        isAuthInProgress: false,
      },
      false
    );

    useToastStore.setState(
      {
        toasts: [],
        showToast: jest.fn(),
        removeToast: jest.fn(),
      },
      true
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('refresh 실패(401)이면 세션을 비우고 토스트를 띄운다', async () => {
    mockRefreshAuthTokens.mockRejectedValueOnce(new ApiError(401, 'Unauthorized'));

    const clearSessionSpy = jest.spyOn(useUserStore.getState(), 'clearSession');
    const showToastSpy = jest.spyOn(useToastStore.getState(), 'showToast');

    useUserStore.setState({
      user: {
        id: 1,
        email: 'user@example.com',
        nickname: 'user',
        profileImageUrl: null,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
      // 만료 5분 미만 → 즉시 refresh 시도
      accessTokenExpiresAt: Date.now() + 1_000,
    });

    renderHook(() => useTokenRefresh());

    await act(async () => {
      await flushPromises();
    });

    expect(mockRefreshAuthTokens).toHaveBeenCalledTimes(1);
    expect(clearSessionSpy).toHaveBeenCalledWith('expired');
    expect(showToastSpy).toHaveBeenCalledWith(
      'warning',
      '로그인 시간이 만료되었습니다. 다시 로그인해 주세요.'
    );
  });

  it('refresh 성공이면 만료 시각을 갱신하고 토스트는 띄우지 않는다', async () => {
    const nextExpiredAt = Date.now() + 10 * 60 * 1000;
    mockRefreshAuthTokens.mockResolvedValueOnce({
      success: true,
      accessTokenExpiresAt: nextExpiredAt,
    });

    const setSessionSpy = jest.spyOn(useUserStore.getState(), 'setSession');
    const showToastSpy = jest.spyOn(useToastStore.getState(), 'showToast');

    const user = {
      id: 1,
      email: 'user@example.com',
      nickname: 'user',
      profileImageUrl: null,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    };

    useUserStore.setState({
      user,
      accessTokenExpiresAt: Date.now() + 1_000,
    });

    renderHook(() => useTokenRefresh());

    await act(async () => {
      await flushPromises();
    });

    expect(mockRefreshAuthTokens).toHaveBeenCalledTimes(1);
    expect(setSessionSpy).toHaveBeenCalledWith({ user, accessTokenExpiresAt: nextExpiredAt });
    expect(showToastSpy).not.toHaveBeenCalled();
  });

  it('만료 5분 전 시점에 refresh를 예약한다', async () => {
    mockRefreshAuthTokens.mockResolvedValueOnce({
      success: true,
      accessTokenExpiresAt: Date.now() + 10 * 60 * 1000,
    });

    useUserStore.setState({
      user: {
        id: 1,
        email: 'user@example.com',
        nickname: 'user',
        profileImageUrl: null,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
      // 지금으로부터 5분 + 1초 뒤 만료 → 1초 뒤 refresh 예약
      accessTokenExpiresAt: Date.now() + 5 * 60 * 1000 + 1_000,
    });

    renderHook(() => useTokenRefresh());

    expect(mockRefreshAuthTokens).not.toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(1_000);
      await flushPromises();
    });

    expect(mockRefreshAuthTokens).toHaveBeenCalledTimes(1);
  });
});
