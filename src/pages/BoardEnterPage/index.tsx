import { Box } from '@chakra-ui/react';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import BoardList from '@/components/common/BoardList';
import { BOARD_LIST } from '@/constants/Board';
import { DEFAULT_PAGE_PADDING, DEFAULT_WIDTH } from '@/constants/style';

const BoardEnterPage = () => {
  return (
    <>
      <PageHeader pageName="게시판 목록" />
      <Box w={DEFAULT_WIDTH} h="100vh" p={`0 ${DEFAULT_PAGE_PADDING}`}>
        {BOARD_LIST.map((board) => (
          <BoardList
            key={board}
            boardName={board}
            fontSize="2rem"
            fontWeight="midium"
            p="10px"
          />
        ))}
      </Box>
      <Footer />
    </>
  );
};

export default BoardEnterPage;
