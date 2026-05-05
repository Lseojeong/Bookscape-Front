import { LocationIcon, MenuIcon, StarIcon } from '@/shared/assets/icons';
import {
  ActionDropdown,
  ActionDropdownContent,
  ActionDropdownItem,
  ActionDropdownTrigger,
} from '@/shared/ui/dropdown/action';
import Title from '@/shared/ui/title/Title';

type ActivityInfoProps = {
  category: string;
  title: string;
  rating: number;
  reviewCount: number;
  address: string;
};

/**
 * 체험 기본 정보 컴포넌트입니다.
 *
 * 카테고리, 제목, 별점, 리뷰 수, 주소를 표시하며 수정/삭제 메뉴를 제공합니다.
 *
 * @example
 * ```tsx
 * <ActivityInfo
 *   category="문화 · 예술"
 *   title="함께 배우면 즐거운 스트릿 댄스"
 *   rating={4.9}
 *   reviewCount={293}
 *   address="서울 중구 청계천로 100 10F"
 * />
 * ```
 */
export default function ActivityInfo({
  category,
  title,
  rating,
  reviewCount,
  address,
}: ActivityInfoProps) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between md:mb-2.5">
        {/* 카테고리 */}
        <p className="typo-13-medium text-gray-700 md:typo-14-medium md:text-gray-950">
          {category}
        </p>
        {/* 케밥 버튼 */}
        <ActionDropdown>
          <ActionDropdownTrigger ariaLabel="메뉴 열기" className="flex items-center">
            <MenuIcon aria-hidden />
          </ActionDropdownTrigger>
          <ActionDropdownContent className="right-0 left-auto">
            <ActionDropdownItem onClick={() => {}}>수정하기</ActionDropdownItem>
            <ActionDropdownItem onClick={() => {}}>삭제하기</ActionDropdownItem>
          </ActionDropdownContent>
        </ActionDropdown>
      </div>
      {/* 타이틀 */}
      <Title as="h1" size="18" weight="bold" color="text-gray-950" className="mb-4 md:typo-24-bold">
        {title}
      </Title>
      {/* 별점 */}
      <div className="mb-2.5 flex items-center gap-1.5">
        <StarIcon aria-hidden />
        <span
          className="typo-14-medium text-gray-700"
          aria-label={`별점 ${rating}점, 리뷰 ${reviewCount}개`}
        >
          {rating} ({reviewCount})
        </span>
      </div>
      {/* 주소 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          <LocationIcon aria-hidden />
          <p className="typo-14-medium text-gray-700">{address}</p>
        </div>
        {/* TODO: 공유 버튼 영역 */}
      </div>
    </div>
  );
}
