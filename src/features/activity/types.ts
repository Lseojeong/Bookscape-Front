/** 체험 리스트 조회 */
export type ActivityData = {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
};

/** GET /activities 응답 */
export type ActivityResponse = {
  activities: ActivityData[];
  totalCount: number;
};
