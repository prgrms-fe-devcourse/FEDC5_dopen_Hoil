import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import {
  changePassword,
  changeProfileImage,
  changeUserName,
} from '@/apis/userInfo';
import { checkAuthenticated, logIn, logOut } from '@/apis/authentication';

import { setItem } from '@/utils/storage';

import { MY_INFO } from '@/constants/queryKeys';
import { LOGIN_TOKEN } from '@/constants/user';

import { saveLoginId } from '@/pages/Login/saveLoginId';
import { UserResponse } from '@/types/user';

interface AuthProps {
  onSuccessFn?: () => void;
  onErrorFn?: (error: AxiosError) => void;
}

interface LogInPayload {
  email: string;
  password: string;
}

interface LoginProps extends AuthProps {
  isSavedId: boolean;
}
interface UpdateUserInfoProps extends AuthProps {
  profileImageFile: File | null;
}

interface UpdateUserInfoMutateProps {
  fullName: string;
  username: string;
  password: string;
}

export const useLogin = ({ onSuccessFn, onErrorFn, isSavedId }: LoginProps) => {
  return useMutation<UserResponse, AxiosError, LogInPayload, unknown>(logIn, {
    onSuccess: (result) => {
      if (onSuccessFn) {
        saveLoginId(isSavedId, result.user?.email);
        setItem(LOGIN_TOKEN, result.token);
        onSuccessFn();
      }
    },
    onError: (error) => {
      if (onErrorFn) {
        onErrorFn(error);
      }
    },
    meta: {
      errorMessage: '로그인에서 에러가 발생했습니다.',
    },
  });
};

export const useLogOut = ({ onSuccessFn }: AuthProps) => {
  return useMutation(logOut, {
    onSuccess: () => {
      if (onSuccessFn) {
        onSuccessFn();
      }
    },
  });
};

export const useUpdateInfo = ({
  onSuccessFn,
  profileImageFile,
}: UpdateUserInfoProps) => {
  return useMutation(
    async ({ fullName, username, password }: UpdateUserInfoMutateProps) => {
      // 1차 내 정보 변경
      await changeUserName({ fullName, username });

      // 2차 비밀번호 변경
      await changePassword(password);

      // 3차 프로필 이미지 변경
      if (profileImageFile && !(profileImageFile instanceof String)) {
        await changeProfileImage({
          image: profileImageFile,
          isCover: false,
        });
      }
    },
    {
      onSuccess: () => {
        if (onSuccessFn) {
          onSuccessFn();
        }
      },
      meta: {
        errorMessage: '회원정보 수정에서 에러가 발생했습니다.',
      },
    },
  );
};

export const useMyInfo = ({ onSuccessFn }: AuthProps = {}) => {
  return useQuery(MY_INFO, checkAuthenticated, {
    onSuccess: () => {
      if (onSuccessFn) {
        onSuccessFn();
      }
    },
  });
};
