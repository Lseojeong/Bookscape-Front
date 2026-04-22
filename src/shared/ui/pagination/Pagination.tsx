import { cva } from 'class-variance-authority';
import { ChevronLeftIcon, ChevronRightIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

type PaginationProps = {
  currentPage: number; // 현재 페이지 번호
  totalPages: number; // 전체 페이지 수
  onPageChange: (page: number) => void; // 페이지 변경 시 호출되는 콜백 함수
  pageGroupSize?: number; // 한 번에 보여줄 페이지 번호 개수 (기본값: 5)
};

type PageButtonProps = {
  children: React.ReactNode; // 버튼에 표시될 내용 (숫자, 화살표)
  onClick: () => void; // 버튼 클릭 시 호출되는 콜백 함수
  disabled?: boolean; // 버튼 비활성화 여부
  isActive?: boolean; // 현재 페이지 버튼 여부
  isArrow?: boolean; // 화살표 버튼 여부
  ariaLabel?: string; // 스크린리더에서 읽힐 버튼 설명 (예: 이전 페이지, 1 페이지 등)
};

const pageButtonVariants = cva(
  'w-10 h-10 flex items-center justify-center', // 모든 버튼에 공통으로 적용될 스타일
  {
    variants: {
      state: {
        default: 'typo-14-medium text-gray-300 cursor-pointer', // 일반 숫자 버튼
        active: 'typo-14-bold text-gray-950 border-b-2 border-primary-500', // 현재 페이지 숫자 버튼
        arrow: 'text-gray-950 cursor-pointer', // 활성 화살표 버튼
        arrowDisabled: 'text-gray-300 cursor-not-allowed', // 비활성 화살표 버튼
      },
    },
    defaultVariants: {
      state: 'default', // state가 없을 때 기본값 (일반 숫자 버튼) 적용
    },
  }
);

const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  pageGroupSize: number
): number[] => {
  const groupIndex = Math.floor((currentPage - 1) / pageGroupSize); // 몇 번째 그룹인지 계산
  const startPage = groupIndex * pageGroupSize + 1; // 그룹의 시작 페이지 번호
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages); // 그룹의 끝 페이지 번호

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage); // 페이지 번호 배열 생성
};

// 숫자/화살표 버튼을 렌더링하는 서브 컴포넌트
function PageButton({
  children,
  onClick,
  disabled,
  isActive,
  isArrow,
  ariaLabel,
}: PageButtonProps) {
  const state = isArrow ? (disabled ? 'arrowDisabled' : 'arrow') : isActive ? 'active' : 'default';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(pageButtonVariants({ state }))}
    >
      {children}
    </button>
  );
}

/**
 * 페이지 단위로 데이터를 나누어 보여줄 수 있는 페이지네이션 공통 컴포넌트입니다.
 *
 * 총 페이지 수에 따라 페이지 번호 버튼이 동적으로 생성되며,
 * 5개씩 그룹으로 묶어 이전/다음 그룹으로 이동할 수 있습니다.
 *
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={currentPage}
 *   totalPages={totalPages}
 *   onPageChange={handlePageChange}
 * />
 * ```
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageGroupSize = 5,
}: PaginationProps) {
  const pageNumbers = getPageNumbers(currentPage, totalPages, pageGroupSize); // 현재 페이지 그룹에 해당하는 페이지 번호 배열
  const startPage = pageNumbers[0]; // 현재 페이지 그룹의 시작 페이지 번호
  const endPage = pageNumbers[pageNumbers.length - 1]; // 현재 페이지 그룹의 끝 페이지 번호
  const isPrevDisabled = startPage === 1; // 이전 페이지 버튼 비활성화 여부 (현재 페이지가 1이면 버튼 비활성화)
  const isNextDisabled = endPage === totalPages; // 다음 페이지 버튼 비활성화 여부 (현재 페이지가 마지막 페이지이면 버튼 비활성화)

  const handlePrevClick = () => {
    if (!isPrevDisabled) {
      onPageChange(startPage - 1); // 이전 페이지 그룹의 마지막 페이지로 이동
    }
  };

  const handleNextClick = () => {
    if (!isNextDisabled) {
      onPageChange(endPage + 1); // 다음 페이지 그룹의 첫 페이지로 이동
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page); // 클릭한 페이지로 이동
  };

  return (
    <nav className="flex items-center gap-1" aria-label="페이지네이션">
      {/* 이전 버튼 */}
      <PageButton
        onClick={handlePrevClick}
        disabled={isPrevDisabled}
        ariaLabel={'이전 페이지'}
        isArrow={true}
      >
        <ChevronLeftIcon />
      </PageButton>

      {/* 페이지 번호 버튼 */}
      {pageNumbers.map((page) => (
        <PageButton
          key={page}
          onClick={() => handlePageClick(page)}
          isActive={page === currentPage}
          ariaLabel={`${page} 페이지`}
        >
          {page}
        </PageButton>
      ))}

      {/* 다음 버튼 */}
      <PageButton
        onClick={handleNextClick}
        disabled={isNextDisabled}
        ariaLabel={'다음 페이지'}
        isArrow={true}
      >
        <ChevronRightIcon />
      </PageButton>
    </nav>
  );
}
