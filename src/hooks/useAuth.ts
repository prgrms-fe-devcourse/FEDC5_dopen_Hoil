import { useMutation, useQuery } from 'react-query';
import { changeUserName } from '@/apis/userInfo';
import { checkAuthenticated, logIn } from '@/apis/authentication';
import { MY_INFO } from '@/constants/queryKeys';
import { User } from '@/apis/type';
import { LOGIN_TOKEN } from '@/constants/user';
import { setItem } from '@/utils/storage';
import { saveLoginId } from '@/pages/Login/saveLoginId';
import { AxiosError } from 'axios';

interface AuthProps {
  onSuccessFn?: () => void;
  onErrorFn?: (error: AxiosError) => void;
}

interface LogInPayload {
  email: string;
  password: string;
}

interface LogInResponse {
  user: User;
  token: string;
}

interface LoginProps extends AuthProps {
  isSavedId: boolean;
}

export const useUpdateInfo = ({ onSuccessFn }: AuthProps) => {
  return useMutation(changeUserName, {
    onSuccess: () => {
      if (onSuccessFn) {
        onSuccessFn();
      }
    },
  });
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

export const useLogin = ({ onSuccessFn, onErrorFn, isSavedId }: LoginProps) => {
  return useMutation<LogInResponse, AxiosError, LogInPayload, unknown>(logIn, {
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
