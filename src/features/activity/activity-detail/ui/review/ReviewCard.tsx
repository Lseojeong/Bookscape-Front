import { StarIcon } from '@/shared/assets/icons';
import { formatYmdToDot } from '@/shared/utils/dateFormat';

type ReviewCardProps = {
  nickname: string;
  rating: number;
  content: string;
  createdAt: string;
};

/**
 * 체험 리뷰 카드 컴포넌트입니다.
 *
 * 닉네임, 작성일, 별점, 리뷰 내용을 표시합니다.
 *
 * @example
 * ```tsx
 * <ReviewCard
 *   nickname="김태현"
 *   rating={5}
 *   content="정말 즐거운 시간이었어요!"
 *   createdAt="2023-02-04T00:00:00.000Z"
 * />
 * ```
 */
export default function ReviewCard({ nickname, rating, content, createdAt }: ReviewCardProps) {
  const formattedDate = formatYmdToDot(createdAt.slice(0, 10));

  return (
    <div className="rounded-3xl p-5 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="typo-14-bold text-gray-950 md:typo-16-bold">{nickname}</p>
          <p className="typo-12-medium text-gray-400 md:typo-14-medium">{formattedDate}</p>
        </div>
        {/* 별점 */}
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className={i < rating ? 'h-4 w-4 text-yellow-500' : 'h-4 w-4 text-gray-200'}
              aria-hidden
            />
          ))}
        </div>
      </div>
      <p className="typo-14-body-medium text-gray-950 md:typo-16-body-medium">{content}</p>
    </div>
  );
}
