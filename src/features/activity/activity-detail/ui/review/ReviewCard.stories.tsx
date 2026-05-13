import type { Meta, StoryObj } from '@storybook/nextjs';
import ReviewCard from './ReviewCard';

const meta: Meta<typeof ReviewCard> = {
  title: 'Features/Activity/Detail/ReviewCard',
  component: ReviewCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    nickname: '김태현',
    rating: 5,
    content:
      '저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극 추천합니다!',
    createdAt: '2023-02-04T00:00:00.000Z',
  },
};

export const LowRating: Story = {
  args: {
    nickname: '조민선',
    rating: 2,
    content: '기대했던 것과 달랐어요.',
    createdAt: '2023-02-04T00:00:00.000Z',
  },
};
