import { Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { User } from '@/apis/type';
import UserProfile from './UserProfile';
import UserFollowInfo from './UserFollowInfo';
import UserGrass from './UserGrass';
import Following from './Following';
import Follower from './Follower';
import { useEffect, useState } from 'react';

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
  const [isFollowing, setIsFollowing] = useState(false);
  const userInfo =
    userList.filter((user) => user.username === username)[0] ?? myInfo;

  const [followId, setFollowId] = useState('');

  const { image, _id: userId } = userInfo;
  const { following } = myInfo;

  useEffect(() => {
    const isAlreadyFollowing = following.some(
      ({ user: followingUserId, _id }) => {
        if (followingUserId === userId) {
          setFollowId(_id);
          return true;
        }
      },
    );
    onupdateFollowing(isAlreadyFollowing);
  }, [userInfo]);

  const onupdateFollowing = (isFollowing: boolean) => {
    setIsFollowing(isFollowing);
  };

  return (
    <Box padding="25px 0">
      <Routes>
        <Route
          path="follow"
          element={
            <Following userInfo={userInfo ?? myInfo} isSameUser={isSameUser} />
          }
        />
        <Route
          path="follower"
          element={
            <Follower
              userInfo={userInfo ?? myInfo}
              isFollowing={isFollowing}
              isSameUser={isSameUser}
            />
          }
        />
        <Route
          path="/*"
          element={
            <>
              <UserProfile
                image={image}
                userId={userId}
                followId={followId}
                username={username}
                isSameUser={isSameUser}
                isFollowing={isFollowing}
                onupdateFollowing={onupdateFollowing}
              />
              <UserFollowInfo followInfo={userInfo ?? myInfo} />
              <UserGrass userInfo={userInfo ?? myInfo} />
            </>
          }
        />
      </Routes>
    </Box>
  );
};

export default UserInfoContainer;
