import { Box } from '@chakra-ui/react';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import BoardList from '@/components/BoardList';
import { BOARD_LIST } from '@/constants/Board';
import { DEFAULT_PAGE_PADDING, DEFAULT_WIDTH } from '@/constants/style';
import { useNavigate } from 'react-router-dom';

const BoardEnterPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader pageName="게시판" />
      <Box w={DEFAULT_WIDTH} h="100vh" p={`0 ${DEFAULT_PAGE_PADDING}`}>
        {Object.keys(BOARD_LIST).map((board) => (
          <BoardList
            key={board}
            boardName={BOARD_LIST[board]}
            fontSize="2rem"
            fontWeight="midium"
            p="10px"
            onClick={() => navigate(`./${[board]}`)}
          />
        ))}
      </Box>
      <Footer />
    </>
  );
};

export default BoardEnterPage;
