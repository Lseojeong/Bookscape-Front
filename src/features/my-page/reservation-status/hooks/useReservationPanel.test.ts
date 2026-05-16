import { renderHook, act } from '@testing-library/react';
import {
  getInitialTab,
  useReservationPanel,
} from '@/features/my-page/reservation-status/hooks/useReservationPanel';
import type { MyActivityReservedScheduleItem } from '@/features/my-page/types';

const makeSchedule = (
  scheduleId: number,
  count: { pending: number; confirmed: number; declined: number }
): MyActivityReservedScheduleItem => ({
  scheduleId,
  startTime: '10:00',
  endTime: '12:00',
  count,
});

// getInitialTab 테스트
describe('getInitialTab', () => {
  it('pending이 있으면 pending을 반환한다', () => {
    const schedules = [makeSchedule(1, { pending: 2, confirmed: 0, declined: 0 })];
    expect(getInitialTab(schedules)).toBe('pending');
  });

  it('pending이 없고 confirmed가 있으면 confirmed를 반환한다', () => {
    const schedules = [makeSchedule(1, { pending: 0, confirmed: 1, declined: 0 })];
    expect(getInitialTab(schedules)).toBe('confirmed');
  });

  it('pending, confirmed 없고 declined만 있으면 declined를 반환한다', () => {
    const schedules = [makeSchedule(1, { pending: 0, confirmed: 0, declined: 3 })];
    expect(getInitialTab(schedules)).toBe('declined');
  });

  it('모든 count가 0이면 pending을 반환한다 (기본값)', () => {
    const schedules = [makeSchedule(1, { pending: 0, confirmed: 0, declined: 0 })];
    expect(getInitialTab(schedules)).toBe('pending');
  });

  it('schedules가 빈 배열이면 pending을 반환한다', () => {
    expect(getInitialTab([])).toBe('pending');
  });

  it('여러 스케줄 중 하나라도 pending이 있으면 pending을 반환한다', () => {
    const schedules = [
      makeSchedule(1, { pending: 0, confirmed: 1, declined: 0 }),
      makeSchedule(2, { pending: 1, confirmed: 0, declined: 0 }),
    ];
    expect(getInitialTab(schedules)).toBe('pending');
  });
});

// useReservationPanel 훅 테스트

describe('useReservationPanel', () => {
  describe('activeTab 초기값', () => {
    it('pending이 있으면 초기 탭은 pending이다', () => {
      const schedules = [makeSchedule(1, { pending: 2, confirmed: 0, declined: 0 })];
      const { result } = renderHook(() => useReservationPanel(schedules));
      expect(result.current.activeTab).toBe('pending');
    });

    it('pending이 없고 confirmed가 있으면 초기 탭은 confirmed이다', () => {
      const schedules = [makeSchedule(1, { pending: 0, confirmed: 1, declined: 0 })];
      const { result } = renderHook(() => useReservationPanel(schedules));
      expect(result.current.activeTab).toBe('confirmed');
    });

    it('schedules가 빈 배열이면 초기 탭은 pending이다', () => {
      const { result } = renderHook(() => useReservationPanel([]));
      expect(result.current.activeTab).toBe('pending');
    });
  });

  describe('handleTabChange', () => {
    it('탭 변경 시 activeTab이 바뀐다', () => {
      const schedules = [makeSchedule(1, { pending: 1, confirmed: 1, declined: 0 })];
      const { result } = renderHook(() => useReservationPanel(schedules));

      act(() => {
        result.current.handleTabChange('confirmed');
      });

      expect(result.current.activeTab).toBe('confirmed');
    });

    it('탭 변경 시 해당 탭의 첫 번째 available 스케줄로 selectedScheduleId가 바뀐다', () => {
      const schedules = [
        makeSchedule(1, { pending: 1, confirmed: 0, declined: 0 }),
        makeSchedule(2, { pending: 0, confirmed: 2, declined: 0 }),
      ];
      const { result } = renderHook(() => useReservationPanel(schedules));

      act(() => {
        result.current.handleTabChange('confirmed');
      });

      expect(result.current.selectedScheduleId).toBe(2);
    });

    it('해당 탭에 available 스케줄이 없으면 첫 번째 스케줄 id로 fallback된다', () => {
      const schedules = [makeSchedule(1, { pending: 1, confirmed: 0, declined: 0 })];
      const { result } = renderHook(() => useReservationPanel(schedules));

      act(() => {
        result.current.handleTabChange('confirmed');
      });

      // available 없으면 schedules[0].scheduleId로 fallback
      expect(result.current.selectedScheduleId).toBe(1);
    });
  });

  describe('availableSchedules', () => {
    it('activeTab 기준으로 count > 0인 스케줄만 반환한다', () => {
      const schedules = [
        makeSchedule(1, { pending: 2, confirmed: 0, declined: 0 }),
        makeSchedule(2, { pending: 0, confirmed: 0, declined: 0 }),
        makeSchedule(3, { pending: 1, confirmed: 0, declined: 0 }),
      ];
      const { result } = renderHook(() => useReservationPanel(schedules));

      expect(result.current.availableSchedules).toHaveLength(2);
      expect(result.current.availableSchedules.map((s) => s.scheduleId)).toEqual([1, 3]);
    });

    it('탭 변경 시 availableSchedules도 해당 탭 기준으로 바뀐다', () => {
      const schedules = [
        makeSchedule(1, { pending: 1, confirmed: 0, declined: 0 }),
        makeSchedule(2, { pending: 0, confirmed: 3, declined: 0 }),
      ];
      const { result } = renderHook(() => useReservationPanel(schedules));

      act(() => {
        result.current.handleTabChange('confirmed');
      });

      expect(result.current.availableSchedules).toHaveLength(1);
      expect(result.current.availableSchedules[0].scheduleId).toBe(2);
    });
  });

  describe('selectedScheduleId 초기값', () => {
    it('초기 탭 기준 첫 번째 available 스케줄 id를 반환한다', () => {
      const schedules = [
        makeSchedule(10, { pending: 0, confirmed: 2, declined: 0 }),
        makeSchedule(20, { pending: 0, confirmed: 1, declined: 0 }),
      ];
      const { result } = renderHook(() => useReservationPanel(schedules));

      expect(result.current.selectedScheduleId).toBe(10);
    });

    it('available 스케줄이 없으면 첫 번째 스케줄 id를 반환한다', () => {
      const schedules = [makeSchedule(5, { pending: 0, confirmed: 0, declined: 0 })];
      const { result } = renderHook(() => useReservationPanel(schedules));

      expect(result.current.selectedScheduleId).toBe(5);
    });
  });
});
