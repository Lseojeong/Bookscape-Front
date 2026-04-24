import FooterNav from '@/shared/ui/footer/FooterNav';
import Logo from '@/shared/ui/logo/Logo';

const COPYRIGHT = '©FE22-PART4-TEAM1';

/**
 * 푸터 컴포넌트입니다.
 *
 * 로고, 카피라이트, SNS 네비게이션으로 구성됩니다.
 *
 * @example
 * ```tsx
 *  <Footer />
 *  ```
 */
export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full border-t border-gray-50 bg-white px-6 py-10 md:px-7.5 md:py-10 lg:px-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex flex-col gap-5">
          <Logo className="h-5 w-21" />
          <span className="text-13 text-gray-400">{COPYRIGHT}</span>
        </div>
        <FooterNav />
      </div>
    </footer>
  );
}
