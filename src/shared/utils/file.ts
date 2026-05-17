import heic2any from 'heic2any';
import { z } from 'zod';
import { IMAGE_RULES, IMAGE_ERROR_MESSAGES } from '@/shared/constants/file';

/**
 * 이미지 파일이 HEIC 형식일 경우 JPEG 포맷의 새로운 File 객체로 변환하여 반환합니다.
 * HEIC 형식이 아닐 경우 원본 파일을 그대로 반환합니다.
 */
export const convertHeicToJpeg = async (file: File): Promise<File> => {
  // HEIC가 아니면 바로 원본 반환
  if (!file.name.toLowerCase().endsWith('.heic') && file.type !== 'image/heic') {
    return file;
  }

  const convertedBlob = await heic2any({
    blob: file,
    toType: 'image/jpeg',
    quality: 0.8,
  });

  const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
  const newFileName = file.name.replace(/\.heic$/i, '.jpg');

  return new File([blob], newFileName, { type: 'image/jpeg' });
};

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
