import { Avatar, Circle, Flex, Text } from '@chakra-ui/react';

interface OnlineUserProfilProps {
  username: string;
  image: string;
}

const OnlineUserProfil = ({ username, image }: OnlineUserProfilProps) => {
  return (
    <Flex w="60px" h="80px" flexDirection="column" alignItems="center">
      <Avatar src={image} w="60px" h="60px" mb="5px">
        {/* <AvatarBadge boxSize="1.25em" bg="#37E97E" /> */}
      </Avatar>
      <Flex alignItems="center">
        <Text color="black" fontSize="1.2rem" fontWeight="semibold">
          {username}
        </Text>
        <Circle size="6px" bg="#37E97E" ml="5px" />
      </Flex>
    </Flex>
  );
};

export default OnlineUserProfil;
