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
    keyword: '여행',
    category: '전체',
    sort: 'latest',
    pageSize: { mobile: 6, tablet: 4, desktop: 8 },
    basePath: '/activities',
  };

  it('초기 렌더링 시 데이터를 올바르게 가져와야 한다', () => {
    const { result } = renderHook(() => useActivityList(defaultParams));

    expect(result.current.activities).toHaveLength(1); // 배열 길이가 1
    expect(result.current.totalPages).toBe(2); // totalPages가 2
    expect(result.current.page).toBe(1); // page가 1
  });

  it('handlePageChange 호출 시 URL의 page 파라미터가 업데이트되어야 한다', () => {
    const { result } = renderHook(() => useActivityList(defaultParams));

    act(() => {
      result.current.handlePageChange(2);
    });

    // router.push가 올바른 경로와 파라미터로 호출되었는지 확인
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('page=2'));
  });

  it('pageSize가 변경되면 페이지를 1로 초기화(replace)해야 한다', () => {
    // 1. 초기 pageSize 설정 (데스크탑 기준 8이라고 가정)
    const initialPageSize = { mobile: 6, tablet: 4, desktop: 8 };
    (usePageSize as jest.Mock).mockReturnValue(8);

    const { rerender } = renderHook(
      ({ pageSize }) => useActivityList({ ...defaultParams, pageSize }),
      { initialProps: { pageSize: initialPageSize } }
    );
    // 2. pageSize가 변경됨 (예: 데스크탑 설정이 8 -> 12로 변경)
    const updatedPageSize = { mobile: 6, tablet: 4, desktop: 12 };

    // pageSize가 20으로 변경되었다고 가정
    (usePageSize as jest.Mock).mockReturnValue(20);

    rerender({ pageSize: updatedPageSize });

    // useEffect 내의 updateParams({ page: '1' }, 'replace')가 실행되었는지 확인
    expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining('page=1'));
  });

  it('카테고리가 "전체"일 경우 빈 문자열로 데이터를 요청해야 한다', () => {
    renderHook(() => useActivityList(defaultParams));

    expect(useActivityListData).toHaveBeenCalledWith(
      expect.objectContaining({
        category: '',
      })
    );
  });

  it('특정 카테고리(예: "문화") 선택 시 API에 해당 값을 그대로 전달해야 한다', () => {
    renderHook(() => useActivityList({ ...defaultParams, category: '문화' }));

    expect(useActivityListData).toHaveBeenCalledWith(expect.objectContaining({ category: '문화' }));
  });

  it('정렬 조건 변경 시 URL의 sort 파라미터가 업데이트되어야 한다', () => {
    const { result } = renderHook(() => useActivityList(defaultParams));

    act(() => {
      // 최신순(latest)에서 평점순(most_reviewed)으로 변경
      result.current.updateParams({ sort: 'most_reviewed' });
    });

    // router.push가 호출될 때 sort=most_reviewed가 포함되어 있는지 확인
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('sort=most_reviewed'));
  });
});
