/**
 * 전체 주소를 받아 기본 주소와 상세 주소로 분리하여 반환합니다.
 * @param fullAddress - 분리할 전체 주소 문자열 (예: "서울시 강남구, 101동 202호")
 */
export const splitAddress = (fullAddress?: string | null) => {
  if (!fullAddress) {
    return { address: '', detailAddress: '' };
  }

  const firstCommaIndex = fullAddress.indexOf(',');

  if (firstCommaIndex === -1) {
    return { address: fullAddress.trim(), detailAddress: '' };
  }

  return {
    address: fullAddress.substring(0, firstCommaIndex).trim(),
    detailAddress: fullAddress.substring(firstCommaIndex + 1).trim(),
  };
};

/**
 * 기본 주소와 상세 주소를 쉼표(,)로 결합합니다.
 */
export const formatAddress = (address: string, detailAddress?: string): string => {
  const formatted = detailAddress ? `${address}, ${detailAddress}` : address;
  return formatted.trim();
};
