'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { SearchIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

/**
 * 검색 Input 컴포넌트입니다.
 *
 * 사용자가 입력한 검색어를 form submit 시 URL query parameter(`keyword`)로 반영합니다.
 * - Enter 키 입력 또는 검색 버튼 클릭 시 동작합니다.
 * - 기존 query는 유지하면서 `keyword`만 추가/수정/삭제합니다.
 * - 입력값이 비어있는 경우 `keyword` query를 제거합니다.
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

  /** 검색 실행 핸들러 */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // form 내부 input(name="keyword") 값 추출
    const formData = new FormData(e.currentTarget);
    const value = (formData.get('keyword') as string).trim();

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

  // TODO : 인풋 베이스 스타일 상수로 분리
  const inputBase =
    'w-full rounded-2xl border border-gray-100 bg-white transition-colors outline-none placeholder:text-gray-400 focus:border-[1.5px] focus:border-primary-500 focus:placeholder-transparent disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-25 disabled:text-gray-400 aria-invalid:border-error';

  return (
    <form role="search" className="relative w-full" onSubmit={handleSubmit}>
      <input
        name="keyword"
        defaultValue={keyword}
        placeholder="체험을 검색해 주세요"
        aria-label="검색어 입력"
        className={cn(
          inputBase,
          'h-15.5 rounded-[20px] px-5 py-5.5 pr-14 typo-14-medium text-gray-950 placeholder:text-gray-400 sm:h-17.5 sm:rounded-3xl sm:typo-18-medium'
        )}
      />
      <button
        type="submit"
        className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer"
        aria-label="검색"
      >
        <SearchIcon />
      </button>
    </form>
  );
}
