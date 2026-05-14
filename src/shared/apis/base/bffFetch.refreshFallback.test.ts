describe('bffFetch refresh-token fallback', () => {
  const mockSetSession = jest.fn();
  const mockClearSession = jest.fn();

  beforeEach(() => {
    mockSetSession.mockClear();
    mockClearSession.mockClear();
  });

  const setupUserStoreMock = () => {
    jest.doMock('@/shared/stores/userStore', () => ({
      useUserStore: {
        getState: () => ({
          user: { id: 'u1' },
          setSession: mockSetSession,
          clearSession: mockClearSession,
        }),
      },
    }));
  };

  it('retries the original request once after a successful refresh', async () => {
    jest.resetModules();
    setupUserStoreMock();
    const { ApiError } = await import('@/shared/apis/apiError');

    const urlCallCounts = new Map<string, number>();
    const coreFetchMock = jest.fn(async (url: string) => {
      urlCallCounts.set(url, (urlCallCounts.get(url) ?? 0) + 1);

      if (url === '/api/books?retry=1') {
        // 최초 요청은 401, refresh 성공 후 재시도는 성공
        if (urlCallCounts.get(url) === 1) throw new ApiError(401, 'unauthorized');
        return { ok: true };
      }
      if (url === '/api/auth/tokens') return { success: true, accessTokenExpiresAt: 123 };
      return null;
    });

    jest.doMock('@/shared/apis/base/coreFetch', () => ({
      __esModule: true,
      coreFetch: coreFetchMock,
      buildQueryString: (query?: Record<string, unknown>) => {
        if (!query) return '';
        const params = new URLSearchParams();
        Object.entries(query).forEach(([k, v]) => {
          if (v !== undefined) params.append(k, String(v));
        });
        return params.toString() ? `?${params.toString()}` : '';
      },
    }));

    const { bffFetch } = await import('@/shared/apis/base/bffFetch');

    // 1) 최초 요청 401
    // 2) refresh 성공(/api/auth/tokens)
    // 3) 원 요청 1회 재시도 성공
    const result = await bffFetch.get<{ ok: boolean }>('/books', { retry: 1 });

    expect(result).toEqual({ ok: true });
    expect(coreFetchMock).toHaveBeenCalledWith(
      '/api/auth/tokens',
      expect.objectContaining({ method: 'POST', credentials: 'include' }),
      undefined
    );
    expect(mockSetSession).toHaveBeenCalledWith({ user: { id: 'u1' }, accessTokenExpiresAt: 123 });
  });

  it('clears the session as expired when refresh fails, then rethrows the original error', async () => {
    jest.resetModules();
    setupUserStoreMock();
    const { ApiError } = await import('@/shared/apis/apiError');

    const coreFetchMock = jest.fn(async (url: string) => {
      if (url === '/api/books') throw new ApiError(401, 'unauthorized');
      if (url === '/api/auth/tokens') throw new ApiError(401, 'refresh failed');
      return null;
    });

    jest.doMock('@/shared/apis/base/coreFetch', () => ({
      __esModule: true,
      coreFetch: coreFetchMock,
      buildQueryString: () => '',
    }));

    const { bffFetch } = await import('@/shared/apis/base/bffFetch');

    await expect(bffFetch.get('/books')).rejects.toBeInstanceOf(ApiError);
    expect(mockClearSession).toHaveBeenCalledWith('expired');
  });

  it('deduplicates concurrent refresh calls (refresh only once)', async () => {
    jest.resetModules();
    setupUserStoreMock();
    const { ApiError } = await import('@/shared/apis/apiError');

    let refreshCalls = 0;
    const urlCallCounts = new Map<string, number>();
    const coreFetchMock = jest.fn(async (url: string) => {
      urlCallCounts.set(url, (urlCallCounts.get(url) ?? 0) + 1);

      if (url === '/api/auth/tokens') {
        refreshCalls += 1;
        // refresh가 느리게 끝나는 상황을 가정
        await new Promise((r) => setTimeout(r, 10));
        return { success: true, accessTokenExpiresAt: 777 };
      }
      if (url === '/api/books?ok=1') {
        // 2개 요청이 각각 1번씩 401을 받고, refresh 이후에는 모두 성공해야 함
        if ((urlCallCounts.get(url) ?? 0) <= 2) throw new ApiError(401, 'unauthorized');
        return { ok: true };
      }
      return null;
    });

    jest.doMock('@/shared/apis/base/coreFetch', () => ({
      __esModule: true,
      coreFetch: coreFetchMock,
      buildQueryString: (query?: Record<string, unknown>) => {
        if (!query) return '';
        const params = new URLSearchParams();
        Object.entries(query).forEach(([k, v]) => {
          if (v !== undefined) params.append(k, String(v));
        });
        return params.toString() ? `?${params.toString()}` : '';
      },
    }));

    const { bffFetch } = await import('@/shared/apis/base/bffFetch');

    const [a, b] = await Promise.all([
      bffFetch.get<{ ok: boolean }>('/books', { ok: 1 }),
      bffFetch.get<{ ok: boolean }>('/books', { ok: 1 }),
    ]);

    expect(a).toEqual({ ok: true });
    expect(b).toEqual({ ok: true });
    expect(refreshCalls).toBe(1);
  });
});
