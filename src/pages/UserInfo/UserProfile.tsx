import { useEffect, useState } from 'react';
import { Flex, Box, Text, Avatar } from '@chakra-ui/react';
import { User } from '@/apis/type';
import UserProfileButton from './UserProfileButton';

interface UserProfileProps {
  userInfo: User;
  myInfo: User;
  username: string;
  isSameUser: boolean;
}

const UserProfile = ({
  userInfo,
  myInfo,
  username,
  isSameUser,
}: UserProfileProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followId, setFollowId] = useState('');

  const { image, _id: userId } = userInfo;
  const { following } = myInfo;

  useEffect(() => {
    const isAlreadyFollowing = following.some(
      ({ user: followingUserId, _id }) => {
        if (followingUserId === userId) {
          setFollowId(_id);
          return followingUserId === userId;
        }
      },
    );
    setIsFollowing(isAlreadyFollowing);
  }, [following]);

  const onupdateFollowing = (isFollowing: boolean) => {
    setIsFollowing(isFollowing);
  };

  return (
    <Flex alignItems="center" p="0 20px" mb="30px">
      <Box mr="15px">
        <Avatar src={image} w="118px" h="118px" />
      </Box>
      <Box>
        <Text as="strong" display="block" fontSize="3xl" mb="15px">
          {username}
        </Text>

        {isSameUser ? (
          ''
        ) : (
          <UserProfileButton
            isFollowing={isFollowing}
            followId={followId}
            userId={userId}
            onupdateFollowing={onupdateFollowing}
          />
        )}
      </Box>
    </Flex>
  );
};

export default UserProfile;
