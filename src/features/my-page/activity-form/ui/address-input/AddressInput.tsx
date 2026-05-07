'use client';

import { useFormContext } from 'react-hook-form';
import type { KakaoPostcodeData } from '@/shared/types/global';
import Button from '@/shared/ui/button/Button';
import FormField from '@/shared/ui/form/FormField';
import FormInput from '@/shared/ui/form/FormInput';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

/**
 * 카카오 우편번호 서비스를 연동하여 주소를 입력받는 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * // 부모 폼 컴포넌트 내에서 사용합니다.
 * const methods = useForm<ActivityFormValues>();
 *
 * return (
 *   <FormProvider {...methods}>
 *     <form onSubmit={methods.handleSubmit(onSubmit)}>
 *       // ...다른 입력 필드들
 *       <AddressInput/>
 *     </form>
 *   </FormProvider>
 * );
 * ```
 *
 * @note
 * - `window.kakao.Postcode`를 통해 카카오 우편번호 팝업을 호출합니다.
 * - 주소 검색 완료 시 `address` 필드에 값을 설정하고 `detailAddress` 입력창으로 자동 포커스합니다.
 * - 사용자의 임의 수정을 막기 위해 기본 주소 입력창은 `readOnly`로 설정되어 있습니다.
 */
export function AddressInput() {
  const {
    control,
    setValue,
    setFocus,
    formState: { errors },
  } = useFormContext();

  const { showToast } = useToastStore();

  /**
   * 카카오 우편번호 팝업을 띄우고, 검색된 주소를 폼 상태에 반영합니다.
   */
  const handleSearchAddress = () => {
    // 스크립트 로딩 방어 코드
    if (!window.kakao || !window.kakao.Postcode) {
      showToast('warning', '잠시 후 다시 시도해주세요.');
      return;
    }

    // 카카오 주소 검색 팝업 열기
    new window.kakao.Postcode({
      oncomplete: (data: KakaoPostcodeData) => {
        // 선택한 주소를 필드에 덮어씌움
        setValue('address', data.address, { shouldValidate: true, shouldDirty: true });
        // 상세 주소 입력창으로 자동 포커스
        setFocus('detailAddress');
      },
    }).open();
  };

  // 기본 주소를 입력하지 않은 에러가 있다면 먼저 보여주고, 기본 주소는 통과했는데 상세 주소 에러가 있다면 그걸 보여줌
  const addressErrorMessage = (errors.address?.message || errors.detailAddress?.message) as
    | string
    | undefined;

  return (
    <div className="flex flex-col gap-2.5">
      <FormField
        label="주소"
        labelAction={
          <Button
            type="button"
            size="sm"
            className="rounded-lg typo-12-medium"
            onClick={handleSearchAddress}
          >
            우편 번호 찾기
          </Button>
        }
      >
        <FormInput
          name="address"
          control={control}
          placeholder="주소를 입력해 주세요"
          readOnly
          className="cursor-default focus:border focus:border-gray-100 focus:ring-0 focus:placeholder:text-gray-400"
        />
      </FormField>

      <FormField errorMessage={addressErrorMessage}>
        <FormInput
          id="detailAddress"
          name="detailAddress"
          control={control}
          placeholder="상세 주소를 입력해 주세요"
        />
      </FormField>
    </div>
  );
}
