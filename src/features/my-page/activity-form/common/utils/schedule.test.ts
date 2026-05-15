import {
  isExceedingMidnight,
  calculateEndTime,
  findOverlapSlot,
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
    it('시작 시간에 진행 시간을 더해 종료 시간을 포맷팅하여 반환한다', () => {
      expect(calculateEndTime('09:00', 2)).toBe('11:00');
      expect(calculateEndTime('14:30', 3)).toBe('17:30');
    });

    it('한 자리 수 시간일 경우 앞에 0을 붙여 2자리로 유지한다', () => {
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
});
