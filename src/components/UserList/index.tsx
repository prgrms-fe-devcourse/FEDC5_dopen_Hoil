import { useQuery } from 'react-query';
import { getUserList } from '@/apis/userInfo';
import { User } from '@/apis/type';
import { AxiosError } from 'axios';
import { StackDivider, StackProps, VStack } from '@chakra-ui/react';
import { USER_LIST } from '@/constants/queryKeys';
import { DEFAULT_WIDTH } from '@/constants/style';
import UserListItem from './UserListItem';

interface UserListProps extends StackProps {
  keyword: string;
  offset?: number;
  limit?: number;
  isDivider?: boolean;
}

// 유저 전체 쿼리후 키워드로 필터링
const UserList = ({ keyword, offset, limit, isDivider }: UserListProps) => {
  const { data } = useQuery<User[], AxiosError>(
    [USER_LIST],
    async () => {
      return await getUserList({ offset, limit });
    },
    {
      refetchOnWindowFocus: false,
      meta: {
        errorMessage: '유저 목록 가져올때 에러 발생하였습니다',
      },
      select: (data) => data.filter((user) => user.username.includes(keyword)),
    },
  );

  if (data && !data.length) {
    return <div>검색어와 일치하는 유저가 없습니다(예시)</div>;
  }
  return (
    <VStack
      w={DEFAULT_WIDTH}
      spacing={0}
      divider={isDivider ? <StackDivider /> : undefined}
    >
      {data?.map((user) => (
        <UserListItem key={user._id} username={user.username} />
      ))}
    </VStack>
  );
};

export default UserList;
