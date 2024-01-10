import OnlineUserProfil from '@/components/OnlineUserProfil';
import { Flex } from '@chakra-ui/react';

interface OnlineUsersProps {
  username: string;
  image: string;
}

const OnlineUsers = ({ username = '테스트', image = '' }: OnlineUsersProps) => {
  return (
    <Flex gap="8px">
      <OnlineUserProfil username={username} image={image} />
    </Flex>
  );
};

export default OnlineUsers;
