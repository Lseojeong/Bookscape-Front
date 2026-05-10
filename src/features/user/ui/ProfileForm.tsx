'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { UserResponse, UpdateMyProfileRequestBody } from '@/features/user/types';
import ImageUploadBox from '@/features/user/ui/ImageUploadBox';
import { profileSchema, type ProfileFormValues } from '@/features/user/utils/schema';
import Button from '@/shared/ui/button/Button';
import FormField from '@/shared/ui/form/FormField';
import FormInput from '@/shared/ui/form/FormInput';
import Input from '@/shared/ui/input/Input';
import PasswordInput from '@/shared/ui/input/PasswordInput';

type ProfileFormProps = {
  user: UserResponse;
  onUpdateUser: (body: UpdateMyProfileRequestBody) => Promise<void>;
};

/**
 * 프로필 수정 폼 컴포넌트
 *
 * @description
 * - 이메일은 수정 불가 필드로 표시합니다.
 * - 닉네임은 필수 입력 필드입니다.
 * - 새 비밀번호 / 비밀번호 확인은 입력 시에만 유효성 검사를 수행합니다.
 * - 저장 성공 후 비밀번호 필드를 초기화합니다.
 * - `user` prop이 변경되면 폼 기본값을 새 사용자 정보로 리셋합니다.
 * - 이미지 수정은 이 폼과 독립적으로 `ImageUploadBox`에서 처리합니다.
 *
 * @param user - 현재 로그인한 사용자 정보
 * @param onUpdateUser - 저장하기 버튼 제출 시 호출되는 콜백
 */

export default function ProfileForm({ user, onUpdateUser }: ProfileFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nickname: '',
      newPassword: '',
      passwordConfirm: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const [nickname, newPassword, passwordConfirm] = watch([
    'nickname',
    'newPassword',
    'passwordConfirm',
  ]);
  const isPasswordFilled = newPassword ? !!passwordConfirm.trim() : true;

  useEffect(() => {
    reset({
      nickname: user.nickname,
      newPassword: '',
      passwordConfirm: '',
    });
  }, [user, reset]);

  const isDisabled =
    !isDirty || !nickname.trim() || Object.keys(errors).length > 0 || !isPasswordFilled;

  const onSubmit = async (values: ProfileFormValues) => {
    const body: UpdateMyProfileRequestBody = {
      nickname: values.nickname,
    };
    if (values.newPassword !== '') {
      body.newPassword = values.newPassword;
    }
    await onUpdateUser(body);
    reset({ nickname: values.nickname, newPassword: '', passwordConfirm: '' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex w-full flex-col gap-6">
      <ImageUploadBox initialImageUrl={user.profileImageUrl} />

      <FormField label="이메일">
        <Input value={user.email} disabled readOnly />
      </FormField>

      <FormField label="닉네임" errorMessage={errors.nickname?.message}>
        <FormInput name="nickname" control={control} placeholder="닉네임을 입력해 주세요" />
      </FormField>

      <FormField label="새 비밀번호" errorMessage={errors.newPassword?.message}>
        <PasswordInput name="newPassword" control={control} placeholder="8자 이상 입력해 주세요" />
      </FormField>

      <FormField label="비밀번호 확인" errorMessage={errors.passwordConfirm?.message}>
        <PasswordInput
          name="passwordConfirm"
          control={control}
          placeholder="비밀번호를 한 번 더 입력해 주세요"
        />
      </FormField>
      <div className="mb-6 flex justify-center">
        <Button
          type="button"
          theme="secondary"
          size="sm"
          className="h-10.5 w-30"
          onClick={() => reset()}
        >
          취소하기
        </Button>
        <Button
          type="submit"
          theme="primary"
          size="sm"
          className="ml-3 h-10.5 w-30"
          disabled={isDisabled}
        >
          저장하기
        </Button>
      </div>
    </form>
  );
}
