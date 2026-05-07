'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { UserResponse, UpdateMyProfileRequestBody } from '@/features/user/types';
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

export default function ProfileForm({ user, onUpdateUser }: ProfileFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nickname: '',
      newPassword: '',
      passwordConfirm: '',
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    reset({
      nickname: user.nickname,
      newPassword: '',
      passwordConfirm: '',
    });
  }, [user, reset]);

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
      {/* 이메일: FormField Context 밖에서 순수 Input 사용 (RHF 연결 불필요) */}
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
        <Button type="button" theme="secondary" size="sm" className="h-10.5 w-30">
          취소하기
        </Button>
        <Button type="submit" theme="primary" size="sm" className="ml-3 h-10.5 w-30">
          저장하기
        </Button>
      </div>
    </form>
  );
}
