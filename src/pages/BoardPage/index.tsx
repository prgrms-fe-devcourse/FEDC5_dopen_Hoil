import { Box, Divider, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { DEFAULT_PAGE_PADDING, DEFAULT_WIDTH } from '@/constants/style';
import { BOARD_LIST } from '@/constants/Board';
import OnlineUsers from '@/pages/BoardPage/OnlineUsers';
import WriteButton from '@/pages/BoardPage/WriteButton';
import BoardPostList from '@/pages/BoardPage/BoardPostList';
import { useOnlineUserList } from '@/hooks/useOnlineUserList';

const BoardPage = () => {
  const { data } = useOnlineUserList();
  const location = useLocation();
  const path = BOARD_LIST[location.pathname.split('/')[2]];

  // if (data && !data.length) {
  //   return <div>검색어와 일치하는 글이 없습니다(예시)</div>;
  // }

  return (
    <>
      <PageHeader pageName={path} />
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
        {data && !data.length ? (
          <Text
            fontSize="1.2rem"
            fontWeight="medium"
            cursor="default"
            mb="10px"
          >
            접속 중인 사용자가 없습니다.
          </Text>
        ) : (
          data?.map((onlineUser) => (
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
