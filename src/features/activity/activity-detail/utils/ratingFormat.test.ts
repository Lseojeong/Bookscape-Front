import { getRatingLabel } from '@/features/activity/activity-detail/utils/ratingFormat';

describe('getRatingLabel', () => {
  it('totalCount가 0이면 "후기 없음"을 반환한다', () => {
    expect(getRatingLabel(5, 0)).toBe('후기 없음');
  });

  it('rating이 4.5 이상이면 "매우 만족"을 반환한다', () => {
    expect(getRatingLabel(4.5, 10)).toBe('매우 만족');
    expect(getRatingLabel(5, 10)).toBe('매우 만족');
  });

  it('rating이 4.0 이상 4.5 미만이면 "만족"을 반환한다', () => {
    expect(getRatingLabel(4.0, 10)).toBe('만족');
    expect(getRatingLabel(4.4, 10)).toBe('만족');
  });

  it('rating이 3.0 이상 4.0 미만이면 "보통"을 반환한다', () => {
    expect(getRatingLabel(3.0, 10)).toBe('보통');
    expect(getRatingLabel(3.9, 10)).toBe('보통');
  });

  it('rating이 2.0 이상 3.0 미만이면 "불만족"을 반환한다', () => {
    expect(getRatingLabel(2.0, 10)).toBe('불만족');
    expect(getRatingLabel(2.9, 10)).toBe('불만족');
  });

  it('rating이 2.0 미만이면 "매우 불만족"을 반환한다', () => {
    expect(getRatingLabel(1.9, 10)).toBe('매우 불만족');
    expect(getRatingLabel(0, 10)).toBe('매우 불만족');
  });
});
