import MainHeader from '@/components/MainHeader';
import { DEFAULT_WIDTH } from '@/constants/style';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <MainHeader />
      <Flex
        w={DEFAULT_WIDTH}
        h="100vh"
        flexDirection="column"
        alignItems="center"
      >
        <Image m="100px 0 30px 0" src="/assets/404.svg" alt="404 Error" />
        <Text
          cursor="default"
          fontSize="1.6rem"
          fontWeight="regular"
          color="black"
        >
          죄송합니다. 해당 페이지를 찾을 수 없습니다.
        </Text>
        <Button
          w="100%"
          h="50px"
          fontSize="1.6rem"
          fontWeight="bold"
          color="white"
          bg="pink.300"
          mt="28px"
          borderRadius="50px"
          _hover={{ bg: 'pink.400' }}
          onClick={() => navigate('/')}
        >
          메인으로 돌아가기
        </Button>
      </Flex>
    </>
  );
};

export default ErrorPage;
