// 현재 페이지 기준으로 보여줄 페이지 번호 배열을 계산하는 함수
export const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  pageGroupSize: number
): number[] => {
  const groupIndex = Math.floor((currentPage - 1) / pageGroupSize); // 몇 번째 그룹인지 계산
  const startPage = groupIndex * pageGroupSize + 1; // 그룹의 시작 페이지 번호
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages); // 그룹의 끝 페이지 번호

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage); // 페이지 번호 배열 생성
};
