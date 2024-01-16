import MainHeader from '@/components/MainHeader';
import { DEFAULT_WIDTH } from '@/constants/style';
import { Box, Button, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <MainHeader />
      <Box w={DEFAULT_WIDTH} h="100vh">
        <Image src="/assets/404.svg" alt="404 Error" />
        <Button
          w="388px"
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
      </Box>
    </>
  );
};

export default ErrorPage;
