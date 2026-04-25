import { useRef, useState } from 'react';
import { SearchIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

type SearchInputProps = {
  onSubmit?: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
};

/**
 * 검색 인풋 UI 확인을 위한 컴포넌트입니다.
 *
 * ⚠️ 실제 SearchInput은 앱 라우터 기반으로 작성해서
 * 스토리북에서 직접 렌더링이 불가능하여 UI 확인 전용으로 생성한 컴포넌트입니다.
 *
 * 확인 가능한 항목
 * - 인풋 기본 스타일 및 focus 상태
 * - 엔터 키 입력 시 검색 실행
 * - 검색 버튼 클릭 시 검색 실행
 * - 검색어 제출 시 하단 "검색어" 텍스트로 결과 확인
 *
 * 실제 컴포넌트와의 차이점
 * - URL query string 업데이트 없음
 * - useRouter, useSearchParams 미사용
 */
export default function SearchInputUi({
  onSubmit,
  defaultValue = '',
  placeholder = '체험을 검색해 주세요',
}: SearchInputProps) {
  const [value, setValue] = useState('');

  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = ref.current?.value ?? '';
    onSubmit?.(value);
    setValue(value);
  };

  const inputBase =
    'w-full rounded-2xl border border-gray-100 bg-white transition-colors outline-none placeholder:text-gray-400 focus:border-[1.5px] focus:border-primary-500 focus:placeholder-transparent disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-25 disabled:text-gray-400 aria-invalid:border-error';

  return (
    <div className="flex w-100 flex-col gap-6 rounded-xl bg-gray-50 p-8">
      <form role="search" className="relative w-full" onSubmit={handleSubmit}>
        <input
          ref={ref}
          defaultValue={defaultValue}
          placeholder={placeholder}
          aria-label="검색어 입력"
          className={cn(
            inputBase,
            'h-15.5 rounded-[20px] px-5 py-5.5 pr-14 typo-14-medium text-gray-950 sm:h-17.5 sm:rounded-3xl sm:typo-18-medium'
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
      <p className="typo-14-medium text-gray-600">
        <span className="typo-16-bold">검색어 : {value}</span>
      </p>
    </div>
  );
}
