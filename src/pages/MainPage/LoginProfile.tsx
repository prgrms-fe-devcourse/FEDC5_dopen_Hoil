import { User } from '@/apis/type';
import { useAdvice } from '@/hooks/useAdvice';
import { Avatar, Flex, Spinner, Text } from '@chakra-ui/react';

interface LoginProfileProps {
  myInfo: User;
}

const LoginProfile = ({ myInfo }: LoginProfileProps) => {
  const { data = '', isError, isLoading } = useAdvice();

  return (
    <Flex cursor="default" alignItems="center" w="100%">
      <Avatar size="2xl" src={myInfo.image || ''} />
      <Flex direction="column" marginLeft="20px">
        <Text width="fit-content" fontSize="3xl" fontWeight="bold">
          <span style={{ color: '#F88585' }}>{myInfo.username}</span> 님
          안녕하세요!
        </Text>
        {isLoading && <Spinner />}
        <Text fontStyle="oblique" fontSize="md">
          {isError ? 'Hi dopen!' : data}
        </Text>
      </Flex>
    </Flex>
  );
};

export default LoginProfile;
