export default function ActivityDetailPage() {
  return (
    <>
      {/* 메인 콘텐츠 */}
      <div className="mx-auto max-w-280 px-6 pt-7.5 pb-30 md:px-7.5 md:pt-8.5 lg:flex lg:gap-10 lg:px-10 lg:pt-22 lg:pb-0">
        {/* 왼쪽 영역 */}
        <div className="bg-blue-100 lg:w-167.5">
          {/* 이미지 슬라이더 자리 */}
          {/* 카테고리, 제목, 별점, 위치 */}
          {/* 탭바 */}
          {/* 체험 설명 */}
          왼쪽 영역
        </div>

        {/* 오른쪽 예약 위젯 - PC에서만 보임 */}
        <div className="hidden bg-red-100 lg:block lg:w-102.5">
          {/* 예약 위젯 */}
          오른쪽 영역
        </div>
      </div>

      {/* 하단 고정 바 - 모바일/태블릿에서만 보임 */}
      <div className="fixed right-0 bottom-0 left-0 bg-green-100 lg:hidden">
        {/* 가격 + 예약하기 버튼 */}
        하단 영역
      </div>
    </>
  );
}
