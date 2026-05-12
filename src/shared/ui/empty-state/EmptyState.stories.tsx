import type { Meta, StoryObj } from '@storybook/nextjs';
import EmptyState from '@/shared/ui/empty-state/EmptyState';

const meta = {
  title: 'Shared/EmptyState',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="flex min-h-100 items-center justify-center bg-white p-10">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoSearchResult: Story = {
  name: '검색 결과 없음',
  render: () => (
    <EmptyState type="search" mainText={'검색 결과가 없습니다.\n다른 키워드로 검색해주세요!'} />
  ),
};

export const NoReview: Story = {
  name: '작성된 후기 없음',
  render: () => (
    <EmptyState type="review" mainText={'작성된 후기가 없습니다.\n첫 번째 후기를 남겨보세요!'} />
  ),
};

export const NoReservedExperience: Story = {
  name: '예약한 체험 없음',
  render: () => (
    <EmptyState
      type="experience"
      mainText="아직 예약한 체험이 없어요."
      button={{
        href: '/activities',
        text: '둘러보기',
      }}
    />
  ),
};

export const NoRegisteredExperience: Story = {
  name: '등록한 체험 없음',
  render: () => (
    <EmptyState
      type="experience"
      mainText={'아직 등록한 체험이 없어요.\n새로운 체험을 등록해보세요!'}
    />
  ),
};

export const NoFilterResult: Story = {
  name: '필터 결과 없음',
  render: () => (
    <EmptyState
      type="experience"
      mainText={'등록된 체험이 없어요.\n다른 카테고리로 확인해보세요!'}
    />
  ),
};

export const ErrorState: Story = {
  name: '에러',
  render: () => (
    <EmptyState
      type="error"
      mainText={'문제가 발생했어요.\n잠시 후 다시 시도해주세요.'}
      onRetry={() => {}}
    />
  ),
};
