import { checkAuthenticated } from '@/apis/authentication';
import { User } from '@/apis/type';
import { useQuery } from 'react-query';
import { MY_INFO } from '@/constants/queryKeys';

const useMyInfo = () => {
  const {
    data: myInfo,
    isError,
    isLoading,
  } = useQuery<User>(
    MY_INFO,
    async () => {
      return await checkAuthenticated();
    },
    {},
  );

  return { myInfo, isError, isLoading };
};

export default useMyInfo;
