import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { DEFAULT_WIDTH } from '@/constants/style';

const PageLayout = () => {
  return (
    <Flex
      position="relative"
      direction="column"
      w="100vw"
      maxW={DEFAULT_WIDTH}
      height="100vh"
      margin="0 auto"
    >
      <Outlet></Outlet>
    </Flex>
  );
};
export default PageLayout;
