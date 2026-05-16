import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { createElement } from 'react';
import { useActivityReviews } from '@/features/activity/activity-detail/queries/useActivityReviews';
import type { ActivityReviewsResponse } from '@/features/activity/types';

jest.mock('@/features/activity/apis', () => ({
  getActivityReviews: jest.fn().mockResolvedValue({
    averageRating: 0,
    totalCount: 0,
    reviews: [],
  }),
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

const mockInitialData: ActivityReviewsResponse = {
  averageRating: 4.5,
  totalCount: 10,
  reviews: [],
};

describe('useActivityReviews', () => {
  it('page가 1이면 initialData가 적용된다', () => {
    const { result } = renderHook(() => useActivityReviews(1, 1, mockInitialData), {
      wrapper: createWrapper(),
    });

    expect(result.current.data).toEqual(mockInitialData);
  });

  it('page가 1이 아니면 initialData가 적용되지 않는다', () => {
    const { result } = renderHook(() => useActivityReviews(1, 2, mockInitialData), {
      wrapper: createWrapper(),
    });

    expect(result.current.data).toBeUndefined();
  });

  it('initialData가 없으면 data는 undefined다', () => {
    const { result } = renderHook(() => useActivityReviews(1, 1), { wrapper: createWrapper() });

    expect(result.current.data).toBeUndefined();
  });
});
