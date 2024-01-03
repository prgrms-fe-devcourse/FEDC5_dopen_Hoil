import { DEFAULT_WIDTH, DEFAULT_PAGE_PADDING } from '@/constants/style';
import { Flex } from '@chakra-ui/react';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import GuestProfile from '@/pages/MainPage/GuestProfile';
import LoginProfile from '@/pages/MainPage/LoginProfile';
import Dday from '@/pages/MainPage/Dday';
import BoardListPreview from '@/pages/MainPage/BoardListPreview';

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
          height="100vh"
          p={`20px ${DEFAULT_PAGE_PADDING}`}
          overflowY="auto"
          direction="column"
        >
          {isLoggedIn ? <LoginProfile /> : <GuestProfile />}
          <Dday isLoggedIn={isLoggedIn} />
          <BoardListPreview />
        </Flex>
        <Footer position="sticky" bottom="0" />
      </Flex>
    </>
  );
};

export default MainPage;
