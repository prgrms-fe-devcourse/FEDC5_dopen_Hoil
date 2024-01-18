import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { DEFAULT_WIDTH } from '@/constants/style';

const PageLayout = () => {
  return (
    <Flex
      position="relative"
      direction="column"
      justify="center"
      w="100vw"
      maxW={DEFAULT_WIDTH}
      height="100dvh"
      margin="0 auto"
      overflowY="auto"
      sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
    >
      <Outlet />
    </Flex>
  );
};
export default PageLayout;
