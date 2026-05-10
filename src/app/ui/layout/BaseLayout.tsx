import HeaderContainer from '@/app/ui/header/HeaderContainer';
import type { WithChildren } from '@/shared/types/common';
import Footer from '@/shared/ui/footer/Footer';

/**
 * ## BaseLayout
 *
 * App Router에서 Header/Footer가 필요한 페이지에 공통으로 사용하는 레이아웃 컴포넌트입니다.
 */
export default function BaseLayout({ children }: WithChildren) {
  return (
    <div className="flex min-h-dvh flex-col">
      <HeaderContainer />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
