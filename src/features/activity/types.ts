import { z } from 'zod';

export const SubImageSchema = z.object({
  id: z.number(),
  imageUrl: z.string(),
});

export const ActivityDetailSchema = z.object({
  bannerImageUrl: z.string(),
  subImages: z.array(SubImageSchema),
});

export type SubImage = z.infer<typeof SubImageSchema>;
export type ActivityDetail = z.infer<typeof ActivityDetailSchema>;
