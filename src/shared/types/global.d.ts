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

/**
 * 카카오맵 위도/경도 좌표 객체의 타입입니다.
 */
export type KakaoLatLng = {
  /** 위도 값 반환 */
  getLat: () => number;
  /** 경도 값 반환 */
  getLng: () => number;
};

/**
 * 카카오맵 Map 인스턴스의 타입입니다.
 */
export type KakaoMapInstance = object;

/**
 * 카카오맵 JavaScript SDK의 maps 네임스페이스 타입입니다.
 * `autoload=false`로 스크립트를 로드한 뒤 `kakao.maps.load()` 콜백 안에서 사용합니다.
 *
 * @example
 * ```tsx
 * window.kakao.maps.load(() => {
 *   const coords = new window.kakao.maps.LatLng(37.5665, 126.9780);
 *   const map = new window.kakao.maps.Map(container, { center: coords, level: 3 });
 *   new window.kakao.maps.Marker({ map, position: coords });
 * });
 * ```
 */
export type KakaoMaps = {
  // SDK 초기화가 완료된 후 콜백 실행
  load: (callback: () => void) => void;
  // 지도 인스턴스 생성
  Map: new (
    container: HTMLElement,
    options: { center: KakaoLatLng; level: number }
  ) => KakaoMapInstance;
  // 위도/경도 좌표 객체 생성
  LatLng: new (lat: number, lng: number) => KakaoLatLng;
  // 지도 위에 마커 생성
  Marker: new (options: { map: KakaoMapInstance; position: KakaoLatLng }) => object;
  services: {
    /**
     * 주소-좌표 변환 등 검색 서비스를 제공하는 Geocoder 생성자입니다.
     * `libraries=services` 옵션을 포함하여 SDK를 로드해야 사용할 수 있습니다.
     */
    Geocoder: new () => {
      // 주소로 좌표 검색
      addressSearch: (
        address: string,
        callback: (result: { x: string; y: string }[], status: string) => void
      ) => void;
    };
    // 주소 검색 결과 상태값
    Status: { OK: string };
  };
};

// 카카오 우편번호 API와 카카오맵 SDK가 window 객체에 주입하는 속성을 타입스크립트에 알려줍니다.
declare global {
  interface Window {
    kakao: {
      Postcode: KakaoPostcodeConstructor;
      maps: KakaoMaps;
    };
    // 카카오톡 공유
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: {
          objectType: string;
          content: {
            title: string;
            description?: string;
            imageUrl?: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          };
          buttons?: Array<{
            title: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          }>;
        }) => void;
      };
    };
  }
}

/**
 * 애플 기기의 고효율 이미지 포맷(HEIC/HEIF)을 브라우저에서 지원하는 JPEG/PNG로
 * 클라이언트 사이드에서 변환해 주는 외부 라이브러리 'heic2any'의 모듈 선언입니다.
 */
declare module 'heic2any';

export {};
