import { Box } from '@chakra-ui/react';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import BoardList from '@/components/BoardList';
import { DEFAULT_PAGE_PADDING, DEFAULT_WIDTH } from '@/constants/style';
import { useNavigate } from 'react-router-dom';
import { useChannelList } from '@/hooks/useChannels';

const BoardEnterPage = () => {
  const navigate = useNavigate();
  const { channelListData } = useChannelList();

  return (
    <>
      <PageHeader pageName="게시판" />
      <Box w={DEFAULT_WIDTH} flex="1" p={`0 ${DEFAULT_PAGE_PADDING}`}>
        {channelListData?.map((board) => (
          <BoardList
            key={board._id}
            boardName={board.description}
            fontSize="1.6rem"
            fontWeight="midium"
            p="10px"
            onClick={() => navigate(`./${[board.name]}`)}
          />
        ))}
      </Box>
      <Footer />
    </>
  );
};

export default BoardEnterPage;
