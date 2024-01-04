import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { DEFAULT_WIDTH } from '@/constants/style';

const PageLayout = () => {
  return (
    <Flex
      position="relative"
      w={DEFAULT_WIDTH}
      height="100vh"
      margin="0 auto"
      direction="column"
    >
      <Outlet></Outlet>
    </Flex>
  );
};
export default PageLayout;
