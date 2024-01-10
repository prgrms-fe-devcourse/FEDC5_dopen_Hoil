import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { ONLINE_USER_LIST } from '@/constants/queryKeys';
import { getOnlineUsers } from '@/apis/onlineUser';
import { User } from '@/apis/type';

export const useOnlineUserList = () => {
  const { data } = useQuery<User[], AxiosError>(
    ONLINE_USER_LIST,
    getOnlineUsers,
    {
      meta: {
        errorMessage: '온라인 유저 목록을 가져올 때 에러가 발생했습니다.',
      },
    },
  );

  return { data };
};
