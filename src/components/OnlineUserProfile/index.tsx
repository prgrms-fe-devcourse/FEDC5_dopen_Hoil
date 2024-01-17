import { Avatar, AvatarBadge, Flex, Text } from '@chakra-ui/react';

interface OnlineUserProfileProps {
  username: string;
  image: string;
  onClick: () => void;
}

const OnlineUserProfile = ({
  username,
  image,
  onClick,
}: OnlineUserProfileProps) => {
  return (
    <Flex
      w="60px"
      h="90px"
      flexDirection="column"
      alignItems="center"
      cursor="pointer"
      onClick={onClick}
    >
      <Avatar src={image} w="60px" h="60px" mb="5px">
        <AvatarBadge boxSize="1.25em" bg="#37E97E" />
      </Avatar>
      <Text
        w="60px"
        fontSize="1.2rem"
        fontWeight="semibold"
        cursor="default"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        textAlign="center"
      >
        {username}
      </Text>
    </Flex>
  );
};

export default OnlineUserProfile;
