import { ACTIVITY_ERROR_MESSAGES } from '@/features/my-page/activity-form/common/constants/validation';
import { activityFormSchema } from '@/features/my-page/activity-form/common/utils/schema';

const schedulesSchema = activityFormSchema.shape.schedules;

describe('activityFormSchema - schedules 유효성 검사', () => {
  it('스케줄이 하나도 없으면 빈 배열 에러를 반환한다', () => {
    const result = schedulesSchema.safeParse([]);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(ACTIVITY_ERROR_MESSAGES.SCHEDULE_REQUIRED);
    }
  });

  it('필수 값(날짜, 시작/종료 시간)이 누락되면 에러를 반환한다', () => {
    const invalidSchedule = [{ id: 1, date: '', startTime: '', endTime: '' }];
    const result = schedulesSchema.safeParse(invalidSchedule);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(ACTIVITY_ERROR_MESSAGES.SCHEDULE_REQUIRED);
    }
  });

  it('같은 날짜에 겹치는 시간대가 있으면 교집합 시간과 함께 에러를 반환한다', () => {
    const overlappingSchedules = [
      { date: '2026-05-20', startTime: '10:00', endTime: '14:00' },
      { date: '2026-05-20', startTime: '12:00', endTime: '16:00' }, // 12:00~14:00 겹침
    ];

    const result = schedulesSchema.safeParse(overlappingSchedules);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        ACTIVITY_ERROR_MESSAGES.SCHEDULE_OVERLAP('12:00', '14:00')
      );
    }
  });

  it('같은 날짜여도 시간대가 겹치지 않으면 통과한다', () => {
    const validSchedules = [
      { date: '2026-05-20', startTime: '10:00', endTime: '12:00' },
      { date: '2026-05-20', startTime: '12:00', endTime: '14:00' },
      { date: '2026-05-20', startTime: '15:00', endTime: '18:00' },
    ];

    const result = schedulesSchema.safeParse(validSchedules);
    expect(result.success).toBe(true);
  });

  it('다른 날짜라면 같은 시간대여도 통과한다', () => {
    const validSchedules = [
      { date: '2026-05-20', startTime: '10:00', endTime: '14:00' },
      { date: '2026-05-21', startTime: '10:00', endTime: '14:00' },
    ];

    const result = schedulesSchema.safeParse(validSchedules);
    expect(result.success).toBe(true);
  });

  it('필수 값이 공백 문자열인 경우 에러를 반환한다', () => {
    const invalidSchedule = [{ id: 1, date: '   ', startTime: '   ', endTime: '   ' }];
    const result = schedulesSchema.safeParse(invalidSchedule);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(ACTIVITY_ERROR_MESSAGES.SCHEDULE_REQUIRED);
    }
  });
});
