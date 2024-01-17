import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { DEFAULT_PAGE_PADDING } from '@/constants/style';
import { useMyInfo } from '@/hooks/useAuth';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import GuestProfile from '@/pages/MainPage/GuestProfile';
import LoginProfile from '@/pages/MainPage/LoginProfile';
import Dday from '@/pages/MainPage/Dday';
import BoardListPreview from '@/pages/MainPage/BoardListPreview';
import LoginGrassBox from '@/pages/MainPage/LoginGrassBox';
import GuestGrassBox from '@/pages/MainPage/GuestGrassBox';

const MainPage = () => {
  const { data: myInfo } = useMyInfo();

  return (
    <>
      <Flex
        position="relative"
        w="100%"
        height="100vh"
        margin="0 auto"
        direction="column"
      >
        <MainHeader />
        <MainPageBody>
          {myInfo ? <LoginProfile myInfo={myInfo} /> : <GuestProfile />}
          <Dday myInfo={myInfo} />
          {!myInfo ? <GuestGrassBox /> : <LoginGrassBox myInfo={myInfo} />}
          <BoardListPreview />
        </MainPageBody>
        <Footer position="sticky" bottom="0" />
      </Flex>
    </>
  );
};

const MainPageBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 20px ${DEFAULT_PAGE_PADDING};
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default MainPage;
