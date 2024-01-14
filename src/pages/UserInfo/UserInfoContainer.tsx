import { Box, Heading } from '@chakra-ui/react';
import { User } from '@/apis/type';
import UserProfile from './UserProfile';
import UserFollowInfo from './UserFollowInfo';

interface UserInfoContainerProps {
  userList: User[];
  myInfo: User;
  isSameUser: boolean;
  username: string;
}

const UserInfoContainer = ({
  userList,
  myInfo,
  isSameUser,
  username,
}: UserInfoContainerProps) => {
  const userInfo = userList.filter((user) => user.username === username)[0];

  return (
    <Box padding="25px 0">
      <UserProfile
        userInfo={userInfo ?? myInfo}
        myInfo={myInfo}
        username={username}
        isSameUser={isSameUser}
      />
      <UserFollowInfo followInfo={userInfo ?? myInfo} />
      <Box mt="55px">
        <Heading></Heading>
        <Box>잔디 자리</Box>
      </Box>
    </Box>
  );
};

export default UserInfoContainer;
