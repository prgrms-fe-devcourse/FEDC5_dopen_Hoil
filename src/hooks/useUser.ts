import { useQuery } from 'react-query';
import { getUserList } from '@/apis/userInfo';
import { USER_LIST, USER_INFO } from '@/constants/queryKeys';

interface userListProps {
  offset?: number;
  limit?: number;
}

export const useGetUsersList = ({ offset, limit }: userListProps = {}) => {
  return useQuery(
    USER_LIST,
    async () => {
      if (offset && limit) {
        return await getUserList({ offset, limit });
      }
      return await getUserList({});
    },
    {},
  );
};

export const useGetUser = () => {
  return useQuery(USER_INFO, async () => {});
};
