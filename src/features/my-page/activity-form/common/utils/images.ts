/**
 * 단일 이미지 혹은 파일 객체를 받아 업로드된 URL을 반환합니다.
 * null이 들어올 경우 null을 반환하여 에러를 방지합니다.
 */
export const getImageUrl = async (
  image: File | string | null,
  uploadFn: (file: File) => Promise<string>
): Promise<string | null> => {
  if (!image) return null;
  if (image instanceof File) {
    return await uploadFn(image);
  }
  return image;
};

/**
 * 여러 개의 이미지/파일 배열을 받아 업로드된 URL 배열을 반환합니다.
 */
export const getImageUrls = async (
  images: (File | string)[],
  uploadFn: (file: File) => Promise<string>
): Promise<string[]> => {
  return await Promise.all(images.map((img) => getImageUrl(img, uploadFn) as Promise<string>));
};
