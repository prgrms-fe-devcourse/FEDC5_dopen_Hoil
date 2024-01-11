import { DEFAULT_WIDTH } from '@/constants/style';
import { Avatar, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const GuestProfile = () => {
  const navigate = useNavigate();

  return (
    <Flex alignItems="center" maxW={DEFAULT_WIDTH}>
      <Avatar size="2xl" />
      <Flex direction="column" marginLeft="20px">
        <Text
          width="fit-content"
          fontSize="3xl"
          fontWeight="bold"
          color="pink.300"
          borderBottom="2px"
          borderColor="transparent"
          transition="border-bottom 0.5s"
          _hover={{ cursor: 'pointer', borderColor: 'pink.300' }}
          onClick={() => navigate('/login')}
        >
          로그인
        </Text>
        <Text fontStyle="oblique" fontSize="md" cursor="default">
          도펜에 가입한 사람이 가장 많은 시간을 갖는다.
        </Text>
      </Flex>
    </Flex>
  );
};

export default GuestProfile;
