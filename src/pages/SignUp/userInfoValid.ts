import { getUserList } from '@/apis/userInfo';
import { userInfoCheck } from './userInfoCheck';
import { UserInfoInput } from '@/types/user';
import { UseFormSetError } from 'react-hook-form';

interface userInfoValidProps {
  userData: UserInfoInput;
  setError: UseFormSetError<UserInfoInput>;
  callback: () => void;
}

export const userInfoValid = async ({
  userData,
  setError,
  callback,
}: userInfoValidProps): Promise<void> => {
  const { username, password, passwordConfirm } = userData;
  const userList = await getUserList({});

  // 중복 닉네임 체크
  const isUserNickNameCheck = userInfoCheck(userList, 'username', username);

  if (isUserNickNameCheck) {
    setError(
      'username',
      { message: '동일한 닉네임이 존재합니다.' },
      { shouldFocus: true },
    );
    return;
  }

  // 비밀번호 일치 체크
  if (password !== passwordConfirm) {
    setError(
      'passwordConfirm',
      { message: '비밀번호가 일치하지 않습니다.' },
      { shouldFocus: true },
    );
    return;
  }

  // mutate
  await callback();
};
