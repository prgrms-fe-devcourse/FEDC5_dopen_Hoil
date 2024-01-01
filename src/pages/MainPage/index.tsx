import { defaultWidth } from '@/constants/style';
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
        w={defaultWidth}
        height="100vh"
        margin="0 auto"
        direction="column"
      >
        <MainHeader />
        <Flex p="20px 20px 90px 20px" overflowY="auto">
          {isLogin ? <LoginProfile /> : <GuestProfile />}
        </Flex>
        {/* 하단 네비게이터 위치 */}
        <Box
          w={defaultWidth}
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
