/**
 * 평점에 따른 라벨을 반환하는 함수
 */
export const getRatingLabel = (rating: number, totalCount: number): string => {
  if (totalCount === 0) return '후기 없음';
  if (rating >= 4.5) return '매우 만족';
  if (rating >= 4.0) return '만족';
  if (rating >= 3.0) return '보통';
  if (rating >= 2.0) return '불만족';
  return '매우 불만족';
};
