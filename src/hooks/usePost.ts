import { useQuery } from 'react-query';
import { MYBOARD_LIST } from '@/constants/queryKeys';
import { checkAuthenticated } from '@/apis/authentication';

export const useMyBoardList = () => {
  return useQuery(
    MYBOARD_LIST,
    async () => {
      const { posts } = await checkAuthenticated();

      return posts;
    },
    {},
  );
};
