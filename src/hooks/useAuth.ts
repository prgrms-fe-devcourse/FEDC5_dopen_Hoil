import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import {
  changePassword,
  changeProfileImage,
  changeUserName,
} from '@/apis/userInfo';
import {
  checkAuthenticated,
  checkUserAuthentication,
  logIn,
  logOut,
  signUp,
} from '@/apis/authentication';

import { setItem } from '@/utils/storage';

import { MY_INFO } from '@/constants/queryKeys';
import { LOGIN_TOKEN } from '@/constants/user';

import { saveLoginId } from '@/pages/Login/saveLoginId';
import { UserInfoInput, UserResponse } from '@/types/user';
import { createChannel } from '@/apis/channel';

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
  newUserInfo: UserInfoInput;
}

interface SignUpProps {
  onSuccessFn: (data: UserResponse) => void;
  onErrorFn?: (error: AxiosError) => void;
  userInfo: UserInfoInput;
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

export const useSignUp = ({
  onSuccessFn,
  onErrorFn,
  userInfo,
}: SignUpProps) => {
  return useMutation(
    async () => {
      const { username, fullName } = userInfo;

      const { _id: id } = await createChannel(username);

      const data = await signUp({
        ...userInfo,
        fullName: JSON.stringify({ name: fullName, timerChannelId: id }),
      });

      return data;
    },
    {
      onSuccess: (data) => onSuccessFn?.(data),
      onError: (error: AxiosError) => {
        if (onErrorFn) {
          onErrorFn(error);
        }
      },
      meta: {
        errorMessage: '회원가입 과정에서 오류가 발생했습니다.',
      },
    },
  );
};

export const useUpdateInfo = ({
  onSuccessFn,
  profileImageFile,
  newUserInfo,
}: UpdateUserInfoProps) => {
  return useMutation(
    async () => {
      const { fullName, username, password, timerChannelId } = newUserInfo;

      // 1차 내 정보 변경
      await changeUserName({
        fullName: JSON.stringify({
          name: fullName,
          timerChannelId,
        }),
        username,
      });
      // // 2차 비밀번호 변경
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

export const useCheckUserAuth = () => {
  return useQuery('auth', checkUserAuthentication, {
    suspense: true,
    useErrorBoundary: true,
    retry: 0,
  });
};
