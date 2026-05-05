import Image, { ImageProps } from 'next/image';
import SpeechBubble from '@/app/(public)/(auth)/ui/SpeechBubble';
import { SkyImage } from '@/shared/assets/images';

/**
 * 로그인 및 회원가입 페이지 우측에 표시되는 브랜딩 컴포넌트입니다.
 * 배경 이미지 위에 서비스 소개 문구와 사용자 후기 말풍선을 오버레이로 렌더링합니다.
 * lg 브레이크 포인트 이상에서만 표시됩니다.
 */
export default function AuthBranding(props: Omit<ImageProps, 'src' | 'alt'>) {
  return (
    <div className="relative h-full w-full">
      {/* 배경 이미지 */}
      <Image
        src={SkyImage}
        alt="하늘 이미지"
        fill
        priority
        className="object-cover object-bottom"
        {...props}
      />

      {/* 오버레이 콘텐츠 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-23.75 text-white">
        <p className="typo-24-medium">체험이 한곳에 모여 있는 곳이 있다?</p>

        <div>
          <SpeechBubble className="translate-x-[26%] -translate-y-[10%] transition-all xl:translate-x-[50%]">
            체험 예약을 관리하는게 편리해요😆
          </SpeechBubble>
          <SpeechBubble
            isFlipped
            className="-translate-x-[26%] transition-all xl:-translate-x-[50%]"
          >
            새로운 액티비티 찾기 좋아요👍
          </SpeechBubble>
          <SpeechBubble className="translate-x-[26%] translate-y-[10%] transition-all xl:translate-x-[50%]">
            여기서 찾고 예약까지 다 했어요😆
          </SpeechBubble>
        </div>

        <p className="text-center typo-32-medium leading-tight">
          체험을 만들고, 찾고, 예약까지 한 번에
          <br />
          북스케이프에서 경험해보세요!
        </p>
      </div>
    </div>
  );
}
