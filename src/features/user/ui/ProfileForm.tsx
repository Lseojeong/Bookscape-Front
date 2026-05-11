'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createMyProfileImageUrl } from '@/features/user/apis';
import type { UserMeResponse, UpdateMyProfileRequestBody } from '@/features/user/types';
import ImageUploadBox from '@/features/user/ui/ImageUploadBox';
import { profileSchema, type ProfileFormValues } from '@/features/user/utils/schema';
import Button from '@/shared/ui/button/Button';
import FormField from '@/shared/ui/form/FormField';
import FormInput from '@/shared/ui/form/FormInput';
import Input from '@/shared/ui/input/Input';
import PasswordInput from '@/shared/ui/input/PasswordInput';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

type ProfileFormProps = {
  user: UserMeResponse;
  onUpdateUser: (body: UpdateMyProfileRequestBody) => Promise<void>;
};

/**
 * 프로필 수정 폼 컴포넌트
 *
 * @description
 * - 이메일은 수정 불가 필드로 표시합니다.
 * - 닉네임은 필수 입력 필드입니다.
 * - 새 비밀번호 / 비밀번호 확인은 필수 입력 필드입니다. (소셜 로그인 유저 제외)
 * - 카카오 로그인(oauth) 사용자는 비밀번호 필드를 표시하지 않습니다.
 * - 파일 선택 시 즉시 업로드하지 않고, 저장하기 버튼 클릭 시 닉네임/비밀번호와 함께 전송합니다.
 * - 취소하기 버튼 클릭 시 수정 전 상태로 복구합니다.
 * - `user` prop이 변경되면 폼 기본값을 새 사용자 정보로 리셋합니다.
 *
 * @param user - 현재 로그인한 사용자 정보 (loginMethod 포함)
 * @param onUpdateUser - 저장하기 버튼 제출 시 호출되는 콜백
 */
export default function ProfileForm({ user, onUpdateUser }: ProfileFormProps) {
  const isOauth = user.loginMethod === 'oauth';
  const { showToast } = useToastStore();

  // 이미지 상태
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(user.profileImageUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // ImageUploadBox 강제 리마운트용 key
  const [imageBoxKey, setImageBoxKey] = useState(0);

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

  useEffect(() => {
    reset({
      nickname: user.nickname,
      newPassword: '',
      passwordConfirm: '',
    });
    setProfileImageUrl(user.profileImageUrl);
    setSelectedFile(null);
    setImageBoxKey((prev) => prev + 1);
  }, [user, reset]);

  // 이미지 변경 여부
  const isImageChanged = selectedFile !== null || profileImageUrl !== user.profileImageUrl;

  // 비밀번호 유효성 (oauth 제외)
  const isPasswordValid =
    isOauth || (newPassword ? !!passwordConfirm.trim() && Object.keys(errors).length === 0 : true);

  const isDisabled =
    (!isDirty && !isImageChanged) ||
    !nickname.trim() ||
    Object.keys(errors).length > 0 ||
    !isPasswordValid;

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
  };

  const handleReset = () => {
    setProfileImageUrl(null);
    setSelectedFile(null);
  };

  const handleCancel = () => {
    reset();
    setSelectedFile(null);
    setProfileImageUrl(user.profileImageUrl);
    setImageBoxKey((prev) => prev + 1); // ImageUploadBox 리마운트
  };

  const onSubmit = async (values: ProfileFormValues) => {
    let imageUrl = profileImageUrl;

    if (selectedFile) {
      try {
        const result = await createMyProfileImageUrl(selectedFile);
        imageUrl = result?.profileImageUrl ?? profileImageUrl;
      } catch {
        showToast('cancel', '이미지 업로드에 실패했습니다. 다시 시도해주세요.');
        return;
      }
    }

    const body: UpdateMyProfileRequestBody = {
      nickname: values.nickname,
      profileImageUrl: imageUrl,
    };
    if (!isOauth && values.newPassword !== '') {
      body.newPassword = values.newPassword;
    }

    await onUpdateUser(body);
    setSelectedFile(null);
    reset({ nickname: values.nickname, newPassword: '', passwordConfirm: '' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex w-full flex-col gap-6">
      <ImageUploadBox
        key={imageBoxKey}
        initialImageUrl={user.profileImageUrl}
        onFileChange={handleFileChange}
        onReset={handleReset}
      />

      <FormField label="이메일">
        <Input value={user.email} disabled readOnly />
      </FormField>

      <FormField label="닉네임" errorMessage={errors.nickname?.message}>
        <FormInput name="nickname" control={control} placeholder="닉네임을 입력해 주세요" />
      </FormField>

      {!isOauth && (
        <>
          <FormField label="새 비밀번호" errorMessage={errors.newPassword?.message}>
            <PasswordInput
              name="newPassword"
              control={control}
              placeholder="8자 이상 입력해 주세요"
            />
          </FormField>

          <FormField label="비밀번호 확인" errorMessage={errors.passwordConfirm?.message}>
            <PasswordInput
              name="passwordConfirm"
              control={control}
              placeholder="비밀번호를 한 번 더 입력해 주세요"
            />
          </FormField>
        </>
      )}

      <div className="mb-6 flex justify-center">
        <Button
          type="button"
          theme="secondary"
          size="sm"
          className="h-10.5 w-30"
          onClick={handleCancel}
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
