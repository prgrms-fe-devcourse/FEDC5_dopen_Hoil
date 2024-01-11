import { EditIcon } from '@chakra-ui/icons';
import { Box, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const WriteButton = () => {
  const navigate = useNavigate();

  return (
    <Box margin="0 auto 20px auto">
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
    </Box>
  );
};

export default WriteButton;
