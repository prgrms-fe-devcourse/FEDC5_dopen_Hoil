import { Flex, Box, Text, Avatar } from '@chakra-ui/react';
import UserProfileButton from './UserProfileButton';

interface UserProfileProps {
  username: string;
  isSameUser: boolean;
  isFollowing: boolean;
  image: string;
  followId: string;
  userId: string;
  onupdateFollowing: (isFollowing: boolean) => void;
}

const UserProfile = ({
  username,
  isSameUser,
  isFollowing,
  image,
  followId,
  userId,
  onupdateFollowing,
}: UserProfileProps) => {
  return (
    <Flex alignItems="center" p="0 20px" mb="30px">
      <Box mr="15px">
        <Avatar src={image} w="118px" h="118px" />
      </Box>
      <Box w="calc(100% - 133px)">
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
