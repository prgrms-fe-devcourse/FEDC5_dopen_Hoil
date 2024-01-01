import { DEFAULT_WIDTH, DEFAULT_PAGE_PADDING } from '@/constants/style';
import { Box, Flex } from '@chakra-ui/react';
import MainHeader from '@/components/MainHeader';
import GuestProfile from '@/pages/MainPage/GuestProfile';
import LoginProfile from '@/pages/MainPage/LoginProfile';

interface MainPageProps {
  isLogin: boolean;
}

const MainPage = ({ isLogin = false }: MainPageProps) => {
  return (
    <>
      <Flex
        position="relative"
        w={DEFAULT_WIDTH}
        height="100vh"
        margin="0 auto"
        direction="column"
      >
        <MainHeader />
        <Flex
          p={`20px ${DEFAULT_PAGE_PADDING} 90px ${DEFAULT_PAGE_PADDING}`}
          overflowY="auto"
        >
          {isLogin ? <LoginProfile /> : <GuestProfile />}
        </Flex>
        {/* 하단 네비게이터 위치 */}
        <Box
          w={DEFAULT_WIDTH}
          position="absolute"
          bottom="0"
          height="80px"
          bg="gray.300"
        />
        {/* 하단 네비게이터 위치 */}
      </Flex>
    </>
  );
};

export default MainPage;
