import { useNavigate } from 'react-router-dom';
import { Follow, User } from '@/apis/type';
import UserListItem from '@/components/UserList/UserListItem';
import { useGetUsersList } from '@/hooks/useUser';
import { Box, UnorderedList } from '@chakra-ui/react';
import { useMyInfo } from '@/hooks/useAuth';

interface FollowProps {
  userInfo: User;
  isSameUser: boolean;
}

type ModifiedUser = Omit<User, 'followers'> & Partial<{ followers: Follow[] }>;

const Following = ({ userInfo, isSameUser }: FollowProps) => {
  const navigate = useNavigate();
  const { data: myInfo } = useMyInfo();
  const { data: userList = [] } = useGetUsersList({});
  const follow = isSameUser
    ? (userInfo.following as Follow[]).map((follow) => follow._id)
    : userInfo.following;
  if (!myInfo) {
    return;
  }

  const myFollowers = myInfo.followers.map((user: ModifiedUser) => user._id);
  const isFollowCheck = follow.some((user) => {
    if (typeof user === 'string') {
      return myFollowers.includes(user);
    }
  });

  return (
    <Box>
      <UnorderedList>
        {isFollowCheck && (
          <UserListItem
            userImage={myInfo.image}
            username={myInfo.username}
            onClick={() => navigate(`/${myInfo.username}`)}
          />
        )}
        {userList.map((user) => {
          const { followers } = user;
          const isFollowing = followers.some((follower) => {
            if (typeof follower === 'string') {
              return follow.includes(follower);
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
        {!isFollowCheck && follow.length === 0 ? (
          <Box textAlign="center" fontSize="1.4rem" p="50px 0">
            팔로우한 유저가 없습니다.
          </Box>
        ) : (
          ''
        )}
      </UnorderedList>
    </Box>
  );
};

export default Following;
