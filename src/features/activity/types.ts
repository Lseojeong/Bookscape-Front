export type CreateActivityRequestBody = {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: Array<{
    date: string;
    startTime: string;
    endTime: string;
  }>;
  bannerImageUrl: string;
  subImageUrls: string[];
};

export type ActivitySubImage = {
  imageUrl: string;
  id: number;
};

export type ActivityScheduleTime = {
  endTime: string;
  startTime: string;
  id: number;
};

export type ActivitySchedule = {
  times: ActivityScheduleTime[];
  date: string;
};

export type CreateActivityResponse = {
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
  subImages: ActivitySubImage[];
  schedules: ActivitySchedule[];
};

export type CreateActivityImageUrlResponse = {
  activityImageUrl: string;
};
