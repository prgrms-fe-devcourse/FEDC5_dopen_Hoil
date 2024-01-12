import { Box, Divider, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { DEFAULT_PAGE_PADDING, DEFAULT_WIDTH } from '@/constants/style';
// import { BOARD_LIST } from '@/constants/Board';
import OnlineUsers from '@/pages/BoardPage/OnlineUsers';
import WriteButton from '@/pages/BoardPage/WriteButton';
import BoardPostList from '@/pages/BoardPage/BoardPostList';
import { useOnlineUserList } from '@/hooks/useOnlineUserList';
import { useChannelList } from '@/hooks/useChannelList';

const BoardPage = () => {
  const { onlineUsersListData } = useOnlineUserList();
  const { channelListData } = useChannelList();
  const location = useLocation();
  const pathInfo = channelListData?.filter(
    (channel) => channel.name === location.pathname.split('/')[2],
  )[0];

  return (
    <>
      <PageHeader pageName={(pathInfo && pathInfo.description) || '게시판'} />
      {/* 실시간 접속자 박스 */}
      <Box w={DEFAULT_WIDTH} padding={`10px ${DEFAULT_PAGE_PADDING}`}>
        <Text
          fontSize="1.6rem"
          fontWeight="semibold"
          color="black"
          cursor="default"
          mb="10px"
        >
          실시간 접속자
        </Text>
        {onlineUsersListData && !onlineUsersListData.length ? (
          <Text
            fontSize="1.2rem"
            fontWeight="medium"
            cursor="default"
            mb="10px"
          >
            접속 중인 사용자가 없습니다.
          </Text>
        ) : (
          onlineUsersListData?.map((onlineUser) => (
            <OnlineUsers
              key={onlineUser._id}
              username={onlineUser.username}
              image={onlineUser.image}
            />
          ))
        )}
        <Divider mt="13px" color="gray.450" />
      </Box>
      {/* 실시간 접속자 박스 */}
      <BoardPostList />
      <WriteButton />
      <Footer />
    </>
  );
};
export default BoardPage;
