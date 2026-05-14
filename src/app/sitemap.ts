import type { MetadataRoute } from 'next';
import { serverFetch } from '@/shared/apis/base/serverFetch';
import { SITE_URL } from '@/shared/constants/url';

// 개별 체험 데이터 타입
type ActivityResponse = {
  id: number;
  updatedAt: string;
};

// 전체 체험 데이터 타입
type ActivitiesResponse = {
  activities: ActivityResponse[];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;
  // 동적 페이지
  let dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    const response = await serverFetch.get<ActivitiesResponse>(
      `/activities`,
      { method: 'offset', size: 1000 },
      { cache: 'no-store' }
    );

    const activities = response?.activities || [];

    if (activities.length > 0) {
      dynamicRoutes = activities
        .filter((activity) => {
          const date = new Date(activity.updatedAt);
          return !isNaN(date.getTime()); // 날짜가 유효할 때만 통과
        })
        .map((activity) => ({
          url: `${baseUrl}/activity/${activity.id}`,
          lastModified: new Date(activity.updatedAt), // 마지막 수정 시간
          changeFrequency: 'weekly' as const, // 주에 한 번 확인
          priority: 0.9, // 페이지 중요도
        }));
    }
  } catch (error) {
    //NOTE: 브라우저 화면이 없는 서버 환경이므로 console.error 사용하여 에러 확인
    console.error('Sitemap 생성 중 활동 데이터를 불러오지 못했습니다:', error);
  }

  // 정적 페이지
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1, // 메인 페이지
    },
    {
      url: `${baseUrl}/activities`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8, // 체험 목록
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.3, // 검색 페이지
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.2, // 회원가입
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.1, // 로그인
    },
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
