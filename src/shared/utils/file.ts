import { z } from 'zod';
import { IMAGE_RULES, IMAGE_ERROR_MESSAGES } from '@/shared/constants/file';

/**
 * 업로드된 이미지 파일의 용량과 확장자를 수동으로 검사합니다.
 *
 * @example
 * ```ts
 * const error = validateImageFile(file);
 * if (error) alert(error);
 * ```
 */
export const validateImageFile = (file: File): string | null => {
  if (file.size > IMAGE_RULES.MAX_SIZE) {
    return IMAGE_ERROR_MESSAGES.IMAGE_SIZE_EXCEEDED;
  }
  if (!(IMAGE_RULES.ACCEPTED_TYPES as readonly string[]).includes(file.type)) {
    return IMAGE_ERROR_MESSAGES.IMAGE_TYPE_INVALID;
  }
  return null;
};

/**
 * RHF에서 이미지 파일을 검증할 때 사용합니다.
 *
 * @example
 * ```ts
 * const schema = z.object({
 *   profileImage: imageFileSchema
 * });
 * ```
 */
export const imageFileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= IMAGE_RULES.MAX_SIZE, IMAGE_ERROR_MESSAGES.IMAGE_SIZE_EXCEEDED)
  .refine(
    (file) => (IMAGE_RULES.ACCEPTED_TYPES as readonly string[]).includes(file.type),
    IMAGE_ERROR_MESSAGES.IMAGE_TYPE_INVALID
  );
