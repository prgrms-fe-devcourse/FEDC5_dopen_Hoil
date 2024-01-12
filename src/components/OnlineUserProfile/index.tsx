import { Avatar, AvatarBadge, Flex, Text } from '@chakra-ui/react';

interface OnlineUserProfileProps {
  username: string;
  image: string;
}

const OnlineUserProfile = ({ username, image }: OnlineUserProfileProps) => {
  return (
    <Flex w="60px" h="80px" flexDirection="column" alignItems="center">
      <Avatar src={image} w="60px" h="60px" mb="5px">
        <AvatarBadge boxSize="1.25em" bg="#37E97E" />
      </Avatar>
      <Text color="black" fontSize="1.2rem" fontWeight="semibold">
        {username}
      </Text>
    </Flex>
  );
};

export default OnlineUserProfile;
