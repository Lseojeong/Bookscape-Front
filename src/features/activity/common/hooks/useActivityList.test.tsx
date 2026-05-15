import { renderHook, act } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActivityList } from '@/features/activity/common/hooks/useActivityList';
import { useActivityListData } from '@/features/activity/common/queries/useActivityListData';
import { usePageSize } from '@/shared/hooks/usePageSize';

// Next.js Navigation 모킹
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// 의존성 모킹
jest.mock('@/shared/hooks/usePageSize');
jest.mock('@/features/activity/common/queries/useActivityListData', () => ({
  useActivityListData: jest.fn(),
  usePrefetchNextPage: jest.fn(),
}));

describe('useActivityList Hook 테스트', () => {
  const mockPush = jest.fn();
  const mockReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // useRouter 기본 반환값 설정
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: mockReplace,
    });

    // useSearchParams 기본값 설정 (page=1)
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue('1'),
    });

    // usePageSize 기본값
    (usePageSize as jest.Mock).mockReturnValue(10);

    // useActivityListData 기본 반환값
    (useActivityListData as jest.Mock).mockReturnValue({
      data: { activities: [{ id: 1, title: '테스트' }], totalCount: 20 },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });
  });

  const defaultParams = {
    keyword: '',
    category: '전체',
    sort: 'latest',
    pageSize: { mobile: 6, tablet: 4, desktop: 8 },
    basePath: '/activities',
  };

  it('초기 렌더링 시 데이터를 올바르게 가져와야 한다', () => {
    const { result } = renderHook(() => useActivityList(defaultParams));

    expect(result.current.activities).toHaveLength(1);
    expect(result.current.totalPages).toBe(2); // totalCount 20 / pageSize 10
    expect(result.current.page).toBe(1);
  });

  it('handlePageChange 호출 시 URL의 page 파라미터가 업데이트되어야 한다', () => {
    const { result } = renderHook(() => useActivityList(defaultParams));

    act(() => {
      result.current.handlePageChange(2);
    });

    // router.push가 올바른 경로와 파라미터로 호출되었는지 확인
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('page=2'));
  });

  it('category가 "전체"일 경우 빈 문자열로 데이터를 요청해야 한다', () => {
    renderHook(() => useActivityList(defaultParams));

    expect(useActivityListData).toHaveBeenCalledWith(
      expect.objectContaining({
        category: '',
      })
    );
  });
});
