import { Box } from '@chakra-ui/react';
import { User } from '@/apis/type';
import UserProfile from './UserProfile';
import UserFollowInfo from './UserFollowInfo';
import UserGrass from './UserGrass';

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
      <UserGrass userInfo={userInfo ?? myInfo} />
    </Box>
  );
};

export default UserInfoContainer;
