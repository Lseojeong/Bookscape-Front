/** 카드 아이템 스타일 상수 */

/**
 * 카드 전체 베이스 스타일
 * ActivityCard, ReservationCard, MyActivityCard에서 사용
 * */
export const cardWrapStyles =
  'relative w-full overflow-hidden rounded-[18px] md:rounded-4xl shadow-card';

/**
 * ReservationCardInfo, MyActivityCardInfo에서 사용
 * - w-[calc(100%-###px)]: 오른쪽 이미지 영역을 제외한 콘텐츠 영역 확보
 * - mr-26.75: 이미지와 겹침 방지 여백
 * - px / py: 내부 여백
 */
export const cardInfoStyles =
  'mr-26.75 flex w-[calc(100%-107px)] flex-col rounded-3xl px-5 py-5 md:w-[calc(100%-157px)] lg:w-[calc(100%-155px)] lg:px-10 lg:py-7.5';
export const cardImageStyles = 'absolute right-0 z-0 w-36.25 md:w-44.25 lg:w-45.25';
