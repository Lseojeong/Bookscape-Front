'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DeleteActivityDialog from '@/features/my-page/common/DeleteActivityDialog';
import { MenuIcon } from '@/shared/assets/icons';
import { useUserStore } from '@/shared/stores/userStore';
import {
  ActionDropdown,
  ActionDropdownContent,
  ActionDropdownItem,
  ActionDropdownTrigger,
} from '@/shared/ui/dropdown/action';

type ActivityKebabMenuProps = {
  id: number;
  userId: number;
};

/**
 * 체험 수정/삭제 케밥 메뉴 컴포넌트입니다.
 *
 * 로그인한 유저가 체험 작성자일 때만 노출됩니다.
 *
 * @example
 * ```tsx
 * <ActivityKebabMenu id={activity.id} userId={activity.userId} />
 * ```
 */
export default function ActivityKebabMenu({ id, userId }: ActivityKebabMenuProps) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { user } = useUserStore();
  const isOwner = user?.id === userId;

  if (!isOwner) return null;

  return (
    <>
      <ActionDropdown>
        <ActionDropdownTrigger ariaLabel="메뉴 열기" className="flex cursor-pointer items-center">
          <MenuIcon aria-hidden />
        </ActionDropdownTrigger>
        <ActionDropdownContent className="right-0 left-auto">
          <ActionDropdownItem onClick={() => router.push(`/activity/${id}/edit`)}>
            수정하기
          </ActionDropdownItem>
          <ActionDropdownItem onClick={() => setIsDeleteModalOpen(true)}>
            삭제하기
          </ActionDropdownItem>
        </ActionDropdownContent>
      </ActionDropdown>
      <DeleteActivityDialog
        id={id}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}
