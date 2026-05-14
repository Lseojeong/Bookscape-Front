import Logo from '@/shared/ui/logo/Logo';

/**
 * 로그인 및 회원가입 폼 상단에 표시되는 헤드라인 컴포넌트입니다.
 * 북스케이프 로고와 브랜드 슬로건 문구를 렌더링합니다.
 */
export default function AuthHeadline() {
  return (
    <div className="flex flex-col">
      <h1 className="mb-8 h-7.5 md:mb-12 md:h-10">
        <Logo className="h-full" />
      </h1>
      <p className="mb-3.5 typo-10-medium text-gray-700 md:mb-3.5 md:typo-14-medium">
        탐색이 머무는 곳, 경험이 펼쳐지는 지도
      </p>
      <p className="typo-18-bold leading-tight text-gray-700 md:typo-32-bold">
        <span className="text-primary-500">북스케이프</span>에서
        <br />
        새로운 경험을 시작해보세요 :)
      </p>
    </div>
  );
}
