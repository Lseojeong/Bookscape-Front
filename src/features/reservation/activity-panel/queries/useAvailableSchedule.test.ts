import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { createElement } from 'react';
import type { ActivitySchedule } from '@/features/activity/types';
import { useAvailableSchedule } from '@/features/reservation/activity-panel/queries/useAvailableSchedule';

jest.mock('@/features/activity/apis', () => ({
  getAvailableSchedule: jest.fn().mockResolvedValue([]),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
  Wrapper.displayName = 'QueryClientWrapper';
  return Wrapper;
};

const mockInitialData: ActivitySchedule[] = [{ date: '2026-05-15', times: [] }];

describe('useAvailableSchedule', () => {
  it('현재 달과 initialYear/Month가 일치하면 initialData가 적용된다', () => {
    const { result } = renderHook(
      () =>
        useAvailableSchedule(1, '2026', '05', {
          initialData: mockInitialData,
          initialYear: '2026',
          initialMonth: '05',
        }),
      { wrapper: createWrapper() }
    );

    expect(result.current.data).toEqual(mockInitialData);
  });

  it('현재 달과 initialYear/Month가 다르면 initialData가 적용되지 않는다', () => {
    const { result } = renderHook(
      () =>
        useAvailableSchedule(1, '2026', '06', {
          initialData: mockInitialData,
          initialYear: '2026',
          initialMonth: '05',
        }),
      { wrapper: createWrapper() }
    );

    expect(result.current.data).toBeUndefined();
  });

  it('initialData가 없으면 data는 undefined다', () => {
    const { result } = renderHook(() => useAvailableSchedule(1, '2026', '05'), {
      wrapper: createWrapper(),
    });

    expect(result.current.data).toBeUndefined();
  });
});
