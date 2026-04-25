import type { FC, SVGProps } from 'react';
import { GithubIcon } from '@/shared/assets/icons';

type NavLinkItem = {
  label: string;
  href: string;
  icon: FC<SVGProps<SVGSVGElement>>;
};

/**
 * 추후 SNS 링크 추가 시 여기에 추가하면 됩니다.
 * ex) { label: 'Instagram', href: '...', icon: InstagramIcon }
 */
const NAV_LINK_ITEMS: NavLinkItem[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/Lseojeong/Bookscape-Front',
    icon: GithubIcon,
  },
];

/**
 * 푸터 우측 SNS 아이콘 네비게이션 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <FooterNav />
 * ```
 */
export default function FooterNav() {
  return (
    <nav aria-label="SNS 링크">
      <ul className="flex items-center gap-3">
        {NAV_LINK_ITEMS.map(({ label, href, icon: Icon }) => (
          <li key={label}>
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Icon className="h-6 w-6 transition-colors hover:text-gray-500" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
