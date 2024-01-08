import { useQuery } from 'react-query';
import { getUserList } from '@/apis/userInfo';

interface userListProps {
  offset?: number;
  limit?: number;
}

export const useGetUsersList = ({ offset, limit }: userListProps = {}) => {
  return useQuery(
    'user-list',
    async () => {
      if (offset && limit) {
        return await getUserList({ offset, limit });
      }
      return await getUserList({});
    },
    {},
  );
};
