'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import SearchInputUi from '@/shared/ui/search-input/SearchInputUi';

/**
 * 검색 인풋 컴포넌트입니다.
 * URL query 파라미터(keyword)로 검색 상태를 관리합니다.
 * 엔터 키 입력 또는 검색 버튼 클릭 시 keyword query를 업데이트합니다.
 *
 * @example
 * ```tsx
 * <SearchInput />
 * ```
 */
export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';

  /** 검색 실행 - keyword query 업데이트 */
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // form 내부 input(name="keyword") 값 추출
    const formData = new FormData(e.currentTarget);
    const value = (formData.get('keyword')?.toString() || '').trim();

    // 기존 query 유지하면서 keyword만 업데이트하기 위한 객체 생성
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('keyword', value);
    } else {
      params.delete('keyword');
    }

    // 변경된 query로 URL 이동 (검색 상태 반영)
    router.push(`?${params.toString()}`);
  };

  return <SearchInputUi onSubmit={handleSubmit} defaultValue={keyword} />;
}
