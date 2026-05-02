/**
 * 우편번호 검색 완료 시 콜백으로 들어오는 데이터의 타입입니다.
 * 카카오 우편번호 서비스 공식 문서에 기반하여 자주 사용하는 속성들을 정의했습니다.
 *
 * @example
 * ```tsx
 * const data: KakaoPostcodeData = {
 *   address: '서울 강남구...',
 *   zonecode: '06000',
 *   addressType: 'R',
 *   bname: '역삼동',
 *   buildingName: '...'
 * };
 * ```
 */
export type KakaoPostcodeData = {
  /** 검색된 기본 주소 */
  address: string;
  /** 우편번호 5자리 */
  zonecode: string;
  /** 검색된 기본 주소 타입 (R: 도로명, J: 지번) */
  addressType: 'R' | 'J';
  /** 법정동/법정리 이름 */
  bname: string;
  /** 건물명 */
  buildingName: string;
};

/**
 * Kakao.Postcode 생성자에 전달되는 옵션 객체의 타입입니다.
 */
export type KakaoPostcodeOptions = {
  /**
   * 우편번호 검색 결과 목록에서 특정 항목을 클릭한 경우,
   * 해당 정보를 받아서 처리할 콜백 함수입니다.
   */
  oncomplete: (data: KakaoPostcodeData) => void;
};

/**
 * 카카오 우편번호 객체의 생성자 및 내부 메서드 타입입니다.
 */
export type KakaoPostcodeConstructor = {
  new (options: KakaoPostcodeOptions): {
    /** 우편번호 찾기 화면을 팝업으로 띄웁니다. */
    open: () => void;
  };
};

// 카카오 우편번호 API가 window 객체에 주입하는 속성을 타입스크립트에 알려줍니다.
declare global {
  interface Window {
    kakao: {
      Postcode: KakaoPostcodeConstructor;
    };
  }
}

export {};
