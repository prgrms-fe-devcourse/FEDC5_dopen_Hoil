import { useParams } from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/react';

import { useGetUsersList } from '@/hooks/useUser';
import { isValueUniqueInArray } from '@/utils/isValueUniqueInArray';

import PageHeader from '@/components/PageHeader';
import ErrorPage from '@/pages/404Page';
import UserProfile from './UserProfile';

const UserInfo = () => {
  const { username = '' } = useParams();

  const { data: userList = [] } = useGetUsersList({});
  const isUserExist = isValueUniqueInArray(userList, 'username', username);

  if (isUserExist === false) {
    return <ErrorPage />;
  }

  return (
    <Box border="1px solid" height="100vh">
      <PageHeader pageName={username} />
      <Box padding="25px 20px">
        <UserProfile userList={userList} username={username} />
        <Box mt="55px">
          <Heading></Heading>
          <Box>잔디 자리</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserInfo;
