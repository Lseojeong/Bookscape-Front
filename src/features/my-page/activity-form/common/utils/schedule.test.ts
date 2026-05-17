import {
  isExceedingMidnight,
  calculateEndTime,
  findOverlapSlot,
  getAvailableStartTimes,
} from '@/features/my-page/activity-form/common/utils/schedule';

describe('schedule utils', () => {
  describe('isExceedingMidnight', () => {
    it('시작 시간과 진행 시간을 더해 24시를 초과하면 true를 반환한다', () => {
      expect(isExceedingMidnight('23:00', 2)).toBe(true); // 25시
      expect(isExceedingMidnight('20:00', 5)).toBe(true); // 25시
    });

    it('시작 시간에 분이 포함되어 자정을 넘기는 경우 true를 반환한다', () => {
      expect(isExceedingMidnight('23:30', 1)).toBe(true); // 24:30
    });

    it('시작 시간과 진행 시간을 더해 24시 이하이면 false를 반환한다', () => {
      expect(isExceedingMidnight('18:00', 2)).toBe(false); // 20시
      expect(isExceedingMidnight('20:00', 4)).toBe(false); // 24시
    });
  });

  describe('calculateEndTime', () => {
    it('시작 시간에 진행 시간을 더해 종료 시간을 반환한다', () => {
      // 09:00 + 2시간 = 11:00
      expect(calculateEndTime('09:00', 2)).toBe('11:00');
      // 14:30 + 3시간 = 17:30
      expect(calculateEndTime('14:30', 3)).toBe('17:30');
    });

    it('자정(24:00)에 도달하는 경우 23:59로 예외 처리한다', () => {
      // 23:00 + 1시간 = 24:00 -> 23:59
      expect(calculateEndTime('23:00', 1)).toBe('23:59');
    });

    it('한 자리 수 시간일 경우 앞에 0을 붙여 2자리로 유지한다', () => {
      // 07:00 + 2시간 = 09:00
      expect(calculateEndTime('07:00', 2)).toBe('09:00');
    });
  });

  describe('findOverlapSlot', () => {
    const existingSlots = [
      { id: 1, date: '2026-05-20', startTime: '09:00', endTime: '11:00' },
      { id: 2, date: '2026-05-20', startTime: '13:00', endTime: '15:00' },
    ];

    it('기존 슬롯과 겹치는 시간대가 들어오면 해당 슬롯 객체를 반환한다', () => {
      // 09:00~11:00 슬롯과 겹침
      const overlap = findOverlapSlot(existingSlots, '10:00', '12:00');
      expect(overlap).toEqual(existingSlots[0]);
    });

    it('기존 슬롯과 겹치지 않는 빈 시간대면 undefined를 반환한다', () => {
      const overlap = findOverlapSlot(existingSlots, '11:00', '13:00');
      expect(overlap).toBeUndefined();
    });
  });

  describe('getAvailableStartTimes', () => {
    beforeEach(() => {
      // 시간에 의존하는 함수이기 때문에 가짜 시간 사용
      jest.useFakeTimers();
    });

    afterEach(() => {
      // 테스트가 끝나면 실제 시간으로 되돌림
      jest.useRealTimers();
    });

    it('오늘 날짜를 선택하면 현재 시간 이하의 시간대는 필터링한다', () => {
      // 현재 시간을 26년 5월 20일 15시로 고정
      jest.setSystemTime(new Date('2026-05-20T15:30:00'));

      const today = new Date('2026-05-20T00:00:00'); // 달력에서 오늘 선택
      const allTimes = ['13:00', '14:00', '15:00', '16:00', '17:00'];

      const result = getAvailableStartTimes(today, allTimes);

      // 16시부터 남아있어야 함
      expect(result).toEqual(['16:00', '17:00']);
    });

    it('미래의 날짜를 선택하면 시간대 필터링 없이 모두 반환한다', () => {
      jest.setSystemTime(new Date('2026-05-20T15:30:00'));

      const tomorrow = new Date('2026-05-21T00:00:00'); // 내일 선택
      const allTimes = ['09:00', '12:00', '15:00'];

      const result = getAvailableStartTimes(tomorrow, allTimes);

      // 미래 날짜이므로 과거/현재 상관없이 전부 통과되어야 함
      expect(result).toEqual(['09:00', '12:00', '15:00']);
    });
  });
});
