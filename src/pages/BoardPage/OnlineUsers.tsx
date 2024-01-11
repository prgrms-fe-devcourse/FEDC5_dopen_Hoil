import OnlineUserProfile from '@/components/OnlineUserProfile';
import { Flex } from '@chakra-ui/react';

interface OnlineUsersProps {
  username: string;
  image: string;
}

const OnlineUsers = ({ username = '테스트', image = '' }: OnlineUsersProps) => {
  return (
    <Flex gap="8px">
      <OnlineUserProfile username={username} image={image} />
    </Flex>
  );
};

export default OnlineUsers;
