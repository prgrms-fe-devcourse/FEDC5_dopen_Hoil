import { Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { DEFAULT_PAGE_PADDING } from '@/constants/style';
import { useMyInfo } from '@/hooks/useAuth';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import GuestProfile from '@/pages/MainPage/GuestProfile';
import LoginProfile from '@/pages/MainPage/LoginProfile';
import Dday from '@/pages/MainPage/Dday';
import BoardListPreview from '@/pages/MainPage/BoardListPreview';
import { useStudyPost } from '@/hooks/useStudy';
import Grass from '@/components/Grass';
import { GRASS_DUMMY } from '@/constants/GrassDummy';

const MainPage = () => {
  const { data: myInfo } = useMyInfo();

  const timerChannelId = myInfo && JSON.parse(myInfo.fullName).timerChannelId;
  const { studyPost = [] } = useStudyPost({
    channelId: timerChannelId,
  });

  const studyPosts = myInfo
    ? studyPost.map(({ title, createdAt }) => ({
        time: title,
        createdAt,
      }))
    : GRASS_DUMMY;

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
          {!myInfo && (
            <Text fontSize="1.5rem" fontWeight="bold" color="black" mb="17px">
              여러분의 열정을 기록해 보세요.
            </Text>
          )}
          <Grass timerPosts={studyPosts} />
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
