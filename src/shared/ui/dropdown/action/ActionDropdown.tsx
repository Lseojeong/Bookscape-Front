'use client';

import { WithChildren } from '@/shared/types/common';
import BaseDropdownRoot from '@/shared/ui/dropdown/base/BaseDropdown';
import BaseDropdownProvider from '@/shared/ui/dropdown/base/BaseDropdownProvider';

/**
 * ActionDropdown
 *
 * ActionDropdown의 루트 컴포넌트입니다.
 *
 * - `BaseDropdownProvider`로 드롭다운의 open 상태를 관리합니다.
 * - `BaseDropdown`을 기준 요소로 사용해 외부 클릭 시 드롭다운을 닫습니다.
 * - 메뉴(콘텐츠) 영역은 `w-fit`을 사용해 내용 크기에 맞게 렌더링됩니다.
 *
 * @param children - `ActionDropdownTrigger`, `ActionDropdownContent`, `ActionDropdownItem` 조합
 *
 * @example
 * ```tsx
 * <ActionDropdown>
 *   <ActionDropdownTrigger>트리거</ActionDropdownTrigger>
 *   <ActionDropdownContent>
 *     <ActionDropdownItem onClick={handleEdit}>수정</ActionDropdownItem>
 *     <ActionDropdownItem onClick={handleDelete}>삭제</ActionDropdownItem>
 *   </ActionDropdownContent>
 * </ActionDropdown>
 * ```
 */
export default function ActionDropdown({ children }: WithChildren) {
  return (
    <BaseDropdownProvider>
      <BaseDropdownRoot>{children}</BaseDropdownRoot>
    </BaseDropdownProvider>
  );
}
