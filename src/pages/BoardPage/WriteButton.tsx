import { getItem } from '@/utils/storage';
import { EditIcon } from '@chakra-ui/icons';
import { Box, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const WriteButton = () => {
  const navigate = useNavigate();

  return (
    <Box
      position="fixed"
      bottom="80px"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      {getItem('login-token', '') ? (
        <Button
          w="160px"
          h="50px"
          borderRadius="100px"
          fontSize="1.6rem"
          fontWeight="medium"
          color="white"
          bg="pink.300"
          _hover={{ bg: 'pink.400' }}
          onClick={() => navigate('./post')}
        >
          글쓰기
          <EditIcon ml="5px" />
        </Button>
      ) : (
        <Box
          w="160px"
          p="10px"
          borderRadius="50px"
          fontSize="1.4rem"
          fontWeight="bold"
          color="white"
          bg="pink.300"
          cursor="pointer"
          _hover={{ bg: 'pink.400' }}
          onClick={() => navigate('/login')}
        >
          포스트 작성은 로그인 후 가능합니다.
        </Box>
      )}
    </Box>
  );
};

export default WriteButton;
