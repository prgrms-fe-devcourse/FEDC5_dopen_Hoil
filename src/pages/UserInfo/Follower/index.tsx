import { useNavigate } from 'react-router-dom';
import { Follow, User } from '@/apis/type';
import UserListItem from '@/components/UserList/UserListItem';
import { useGetUsersList } from '@/hooks/useUser';
import { Box, UnorderedList } from '@chakra-ui/react';
import { useMyInfo } from '@/hooks/useAuth';

interface FollowerProps {
  userInfo: User;
  isFollowing: boolean;
  isSameUser: boolean;
}

const Follower = ({ userInfo, isFollowing, isSameUser }: FollowerProps) => {
  const navigate = useNavigate();
  const { data: myInfo } = useMyInfo();
  const { data: userList = [] } = useGetUsersList({});
  const followers = isSameUser
    ? (userInfo.followers as Follow[]).map((follow) => follow._id)
    : userInfo.followers;
  if (!myInfo) {
    return;
  }

  return (
    <Box>
      <UnorderedList>
        {isFollowing && (
          <UserListItem
            userImage={myInfo.image}
            username={myInfo.username}
            onClick={() => navigate(`/${myInfo.username}`)}
          />
        )}
        {userList.map((user) => {
          const following = user.following;
          const isFollowing = following.some((follow) => {
            if (typeof follow === 'string') {
              return followers.includes(follow);
            }
          });
          if (isFollowing) {
            return (
              <UserListItem
                key={user._id}
                userImage={user.image}
                username={user.username}
                onClick={() => navigate(`/${user.username}`)}
              />
            );
          }
        })}
        {!isFollowing && followers.length === 0 ? (
          <Box textAlign="center" fontSize="1.4rem" p="50px 0">
            팔로워한 유저가 없습니다.
          </Box>
        ) : (
          ''
        )}
      </UnorderedList>
    </Box>
  );
};

export default Follower;
