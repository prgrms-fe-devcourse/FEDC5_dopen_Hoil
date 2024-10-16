import { getItem } from '@/utils/storage';
import { EditIcon } from '@chakra-ui/icons';
import { Box, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const WriteButton = () => {
  const navigate = useNavigate();

  const handleWriteButton = () => {
    const loginToken = getItem('login-token', '');

    if (loginToken) {
      navigate('./post');
    } else {
      navigate('/login');
    }
  };

  return (
    <Box
      position="fixed"
      bottom="80px"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <Button
        w="160px"
        h="50px"
        borderRadius="100px"
        fontSize="1.6rem"
        fontWeight="medium"
        color="white"
        bg="pink.300"
        _hover={{ bg: 'pink.400' }}
        onClick={handleWriteButton}
      >
        글쓰기
        <EditIcon ml="5px" />
      </Button>
    </Box>
  );
};

export default WriteButton;
