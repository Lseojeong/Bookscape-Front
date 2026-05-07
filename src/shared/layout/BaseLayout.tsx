import type { WithChildren } from '@/shared/types/common';
import type { AvatarUser } from '@/shared/ui/avatar/types';
import Footer from '@/shared/ui/footer/Footer';
import Header from '@/shared/ui/header/Header';

type BaseLayoutProps = WithChildren & {
  /** 로그인 여부 (Header 우측 메뉴 분기용) */
  isLoggedIn?: boolean;
  /** 로그인 유저 정보 */
  user?: AvatarUser;
};

/**
 * ## BaseLayout
 *
 * App Router에서 Header/Footer가 필요한 페이지에 공통으로 사용하는 레이아웃 컴포넌트입니다.
 *
 * @remarks
 * - `Header`와 `Footer`를 고정으로 포함하고, 본문 영역은 `children`으로 렌더링합니다.
 * - 본문은 `flex-1`로 설정하여 푸터가 하단에 자연스럽게 붙도록 합니다.
 *
 * @example
 * ```tsx
 * <BaseLayout>
 *   <div>페이지 콘텐츠</div>
 * </BaseLayout>
 * ```
 */
export default function BaseLayout({ children, isLoggedIn, user }: BaseLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header isLoggedIn={isLoggedIn} user={user} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
