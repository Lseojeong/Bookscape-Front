import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { UpsertOauthAppRequestBody } from '@/features/auth/types/oauth';
import { ApiError } from '@/shared/apis/apiError';
import { serverFetch } from '@/shared/apis/serverFetch';

type OAuthAppResponse = {
  createdAt: string;
  updatedAt: string;
  appKey: string;
  provider: string;
  teamId: string;
  id: number;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as UpsertOauthAppRequestBody;
    const data = await serverFetch.post<OAuthAppResponse>('/oauth/apps', body);
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'UNKNOWN_ERROR' }, { status: 500 });
  }
}
