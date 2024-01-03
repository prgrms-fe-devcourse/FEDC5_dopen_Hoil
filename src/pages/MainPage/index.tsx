import { DEFAULT_WIDTH, DEFAULT_PAGE_PADDING } from '@/constants/style';
import { Flex } from '@chakra-ui/react';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import GuestProfile from '@/pages/MainPage/GuestProfile';
import LoginProfile from '@/pages/MainPage/LoginProfile';
import Dday from '@/pages/MainPage/Dday';
import EnterBoard from '@/pages/MainPage/EnterBoard';

interface MainPageProps {
  isLoggedIn?: boolean;
}

const MainPage = ({ isLoggedIn = false }: MainPageProps) => {
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
          direction="column"
        >
          {isLoggedIn ? <LoginProfile /> : <GuestProfile />}
          <Dday isLoggedIn={isLoggedIn} />
          <EnterBoard />
        </Flex>
        <Footer position="absolute" bottom="0" />
      </Flex>
    </>
  );
};

export default MainPage;
