'use client';

import Link from 'next/link';
import Lottie from 'react-lottie-player';
import { NoDataAnimation, NoReviewAnimation, NoSearchAnimation } from '@/shared/assets/lotties';
import Button from '@/shared/ui/button/Button';

/**
 * 후기가 없는 상태를 표시할 때 사용하는 props입니다.
 *
 * @example
 * ```tsx
 * <EmptyState type="review" mainText={'작성된 후기가 없습니다.\n첫 번째 후기를 남겨보세요!'} />
 * ```
 */
type ReviewProps = {
  /** 후기 없음 상태를 나타냅니다. */
  type: 'review';
  /** 화면에 표시할 안내 문구입니다. 줄바꿈은 `\n`으로 전달합니다. */
  mainText: string;
  button?: never;
};

/**
 * 검색 결과가 없는 상태를 표시할 때 사용하는 props입니다.
 *
 * @example
 * ```tsx
 * <EmptyState type="search" mainText={'검색 결과가 없습니다.\n다른 키워드로 검색해주세요!'} />
 * ```
 */
type SearchProps = {
  /** 검색 결과 없음 상태를 나타냅니다. */
  type: 'search';
  /** 화면에 표시할 안내 문구입니다. 줄바꿈은 `\n`으로 전달합니다. */
  mainText: string;
  button?: never;
};

/**
 * 체험 데이터가 없는 상태를 표시할 때 사용하는 props입니다.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   type="experience"
 *   mainText="아직 예약한 체험이 없어요."
 *   button={{ href: '/activities', text: '둘러보기' }}
 * />
 * ```
 */
type ExperienceProps = {
  /** 체험 없음 상태를 나타냅니다. */
  type: 'experience';
  /** 화면에 표시할 안내 문구입니다. 줄바꿈은 `\n`으로 전달합니다. */
  mainText: string;
  /** 하단에 표시할 이동 버튼 정보입니다. */
  button?: { href: string; text: string };
};

type EmptyStateProps = ReviewProps | SearchProps | ExperienceProps;

/**
 * 데이터가 없는 화면에서 공통으로 사용하는 empty state 컴포넌트입니다.
 * `type`에 따라 검색 없음, 후기 없음, 일반 데이터 없음 lottie를 자동으로 표시합니다.
 *
 * @example
 * ```tsx
 * <EmptyState type="search" mainText={'검색 결과가 없습니다.\n다른 키워드로 검색해주세요!'} />
 * ```
 *
 * @example
 * ```tsx
 * <EmptyState type="review" mainText={'작성된 후기가 없습니다.\n첫 번째 후기를 남겨보세요!'} />
 * ```
 *
 * @example
 * ```tsx
 * <EmptyState
 *   type="experience"
 *   mainText="아직 예약한 체험이 없어요."
 *   button={{ href: '/activities', text: '둘러보기' }}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <EmptyState
 *   type="experience"
 *   mainText={'아직 등록한 체험이 없어요.\n새로운 체험을 등록해보세요!'}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <EmptyState
 *   type="experience"
 *   mainText={'선택한 필터에 맞는 체험이 없어요.\n다른 조건으로 다시 확인해보세요!'}
 * />
 * ```
 */
export default function EmptyState(props: EmptyStateProps) {
  const { type, mainText, button } = props;

  const animationMap = {
    review: NoReviewAnimation,
    search: NoSearchAnimation,
    experience: NoDataAnimation,
  } as const;

  const animationData = animationMap[type];

  const renderButton = () => {
    if (type !== 'experience' || !button?.text) return null;

    return (
      <Button as={Link} href={button.href} theme="primary">
        {button.text}
      </Button>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-7.5 flex flex-col items-center justify-center typo-16-body-medium text-gray-600">
        <Lottie aria-hidden="true" className="h-55 w-55" animationData={animationData} loop play />
        <p className="text-center whitespace-pre-line">{mainText}</p>
      </div>

      {renderButton()}
    </div>
  );
}
