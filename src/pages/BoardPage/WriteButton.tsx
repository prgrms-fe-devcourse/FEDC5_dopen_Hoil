import { EditIcon } from '@chakra-ui/icons';
import { Box, Button } from '@chakra-ui/react';

const WriteButton = () => {
  return (
    // TODO : onClick 이벤트 (navigate 글쓰기 페이지)
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
      >
        글쓰기
        <EditIcon ml="5px" />
      </Button>
    </Box>
  );
};

export default WriteButton;
