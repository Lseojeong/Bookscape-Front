'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MenuIcon, StarIcon } from '@/shared/assets/icons';
import ConfirmDialog from '@/shared/ui/dialog/ConfirmDialog';
import {
  ActionDropdown,
  ActionDropdownContent,
  ActionDropdownItem,
  ActionDropdownTrigger,
} from '@/shared/ui/dropdown/action';
import Title from '@/shared/ui/title/Title';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';
import { cn } from '@/shared/utils/cn';
import { useDeleteActivity } from '../../mutations/useDeleteActivity';
import ActivityAddress from './ActivityAddress';

type ActivityInfoProps = {
  id: number;
  category: string;
  title: string;
  rating: number;
  reviewCount: number;
  address: string;
  isOwner?: boolean;
  className?: string;
};

/**
 * 체험 기본 정보 컴포넌트입니다.
 *
 * 카테고리, 제목, 별점, 리뷰 수, 주소를 표시하며 수정/삭제 메뉴를 제공합니다.
 *
 * @example
 * ```tsx
 * <ActivityInfo
 *   id={activity.id}
 *   category={activity.category}
 *   title={activity.title}
 *   rating={activity.rating}
 *   reviewCount={activity.reviewCount}
 *   address={activity.address}
 * />
 *
 */
export default function ActivityInfo({
  id,
  category,
  title,
  rating,
  reviewCount,
  address,
  isOwner,
  className,
}: ActivityInfoProps) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { mutate: deleteActivity } = useDeleteActivity();
  const { showToast } = useToastStore();

  return (
    <div className={cn(className)}>
      <div className="mb-1 flex items-center justify-between md:mb-2.5">
        {/* 카테고리 */}
        <p className="typo-13-medium text-gray-700 md:typo-14-medium md:text-gray-950">
          {category}
        </p>
        {/* 케밥 버튼 */}
        {isOwner && (
          <ActionDropdown>
            <ActionDropdownTrigger
              ariaLabel="메뉴 열기"
              className="flex cursor-pointer items-center"
            >
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
        )}
      </div>
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="체험을 삭제하시겠습니까?"
        description="삭제할 경우, 다시 되돌릴 수 없습니다."
        confirmText="삭제하기"
        cancelText="아니오"
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={async () => {
          deleteActivity(id, {
            onSuccess: () => {
              showToast('check', '체험이 삭제되었습니다.');
              router.push('/activities');
            },
            onError: () => {
              showToast('cancel', '체험 삭제에 실패했습니다.');
            },
          });
          setIsDeleteModalOpen(false);
        }}
      />
      {/* 타이틀 */}
      <Title as="h1" size="18" weight="bold" color="text-gray-950" className="mb-4 md:typo-24-bold">
        {title}
      </Title>
      {/* 별점 */}
      <div className="mb-2.5 flex items-center gap-1.5">
        <StarIcon aria-hidden className="text-yellow-500" />
        <span
          className="typo-14-medium text-gray-700"
          aria-label={`별점 ${rating}점, 리뷰 ${reviewCount}개`}
        >
          {rating} ({reviewCount})
        </span>
      </div>
      {/* 주소 */}
      <div className="flex items-center justify-between">
        <ActivityAddress address={address} />
        {/* TODO: 공유 버튼 영역 */}
      </div>
    </div>
  );
}
