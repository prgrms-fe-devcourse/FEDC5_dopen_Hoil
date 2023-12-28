import { Box, Button, Flex, Spinner, useColorMode } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';

const Test: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isLoading, isError, data } = useQuery('userList', () => {
    return axios.get(
      'https://kdt.frontend.5th.programmers.co.kr:5011/users/get-users',
    );
  });
  if (isError) {
    return <div>오류입니다</div>;
  }

  return (
    <>
      <Box bg="pink.300" w="120px" h="150px" color="gray.700">
        테스트 컴포넌트
        <Button fontSize="xs" onClick={toggleColorMode}>
          다크모드 토글{colorMode === 'light' ? 'Dark' : 'light'}
        </Button>
      </Box>
      {isLoading ? (
        <Spinner w="150px" h="150px" />
      ) : (
        <Flex flexDir="column" w="200px" h="150px">
          {data?.data.map((user: { _id: string; email: string }) => (
            <span key={user._id}>{user.email}</span>
          ))}
        </Flex>
      )}
    </>
  );
};

export default Test;
