import { Box, Button, useColorMode } from '@chakra-ui/react';

const Test = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box bg="pink.300" w="120px" h="150px" color="gray.700">
      테스트 컴포넌트
      <Button fontSize="xs" onClick={toggleColorMode}>
        다크모드 토글{colorMode === 'light' ? 'Dark' : 'light'}
      </Button>
    </Box>
  );
};

export default Test;
