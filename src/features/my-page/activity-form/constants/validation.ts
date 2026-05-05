/**
 * 체험 등록/수정 페이지에서 사용되는 에러 메시지입니다.
 */
export const ACTIVITY_ERROR_MESSAGES = {
  TITLE_REQUIRED: '제목을 작성해주세요',
  TITLE_MAX_LENGTH: '제목은 최대 50자 이내로 작성해주세요',
  CATEGORY_REQUIRED: '카테고리를 선택해주세요',
  DESCRIPTION_REQUIRED: '설명을 작성해주세요',
  PRICE_REQUIRED: '가격을 작성해주세요',
  ADDRESS_REQUIRED: '주소를 작성해주세요',
  DETAIL_ADDRESS_REQUIRED: '상세 주소를 작성해주세요',
  SCHEDULE_REQUIRED: '날짜와 시간 모두 선택해주세요',
  BANNER_REQUIRED: '배너 이미지를 등록해주세요',
  SCHEDULE_OVERLAP: (date: string, start: string, end: string) =>
    `${date} ${start} - ${end}이 중복입니다`,
  DATE_ALREADY_ADDED: '이미 추가된 날짜입니다.',
  TIME_EXCEEDS_MIDNIGHT: '자정(24:00)을 초과하는 시간대는 등록할 수 없습니다.',
};
