import { forwardRef } from 'react';
import { SearchIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

type SearchInputUiProps = {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  defaultValue?: string;
  placeholder?: string;
  name?: string;
  className?: string;
};

/**
 * 검색 인풋 UI 컴포넌트입니다.
 * 검색 실행 핸들러는 onSubmit prop으로 주입받아 실행합니다.
 * ref는 input 엘리먼트로 전달됩니다.
 *
 * 실제 검색 핸들러는 SearchInput에서 관리합니다.
 * 스토리북에서는 앱 라우터 의존성으로 인해 SearchInput 대신 이 컴포넌트를 직접 사용합니다.
 */
const SearchInputUi = forwardRef<HTMLInputElement, SearchInputUiProps>(
  ({ onSubmit, placeholder = '체험을 검색해 주세요', defaultValue, name, className }, ref) => {
    return (
      <form role="search" className="relative w-full" onSubmit={onSubmit}>
        <input
          ref={ref}
          name={name ?? 'keyword'}
          defaultValue={defaultValue}
          placeholder={placeholder}
          aria-label="검색어 입력"
          className={cn(
            'field-surface field-input',
            'h-15.5 w-full rounded-[20px] px-5 py-5.5 pr-14 typo-16-medium shadow-drop md:h-17.5 md:rounded-3xl md:px-8 md:py-6 md:pr-22 md:typo-18-medium',
            className
          )}
        />
        <button
          type="submit"
          className="absolute top-1/2 right-5 -translate-y-1/2"
          aria-label="검색"
        >
          <SearchIcon />
        </button>
      </form>
    );
  }
);

SearchInputUi.displayName = 'SearchInputUi'; // React DevTools에서 보여질 컴포넌트 이름
export default SearchInputUi;
