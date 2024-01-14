import { useFirstPost } from '@/hooks/usePost';
import { Box, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface MainBoardItemProps {
  boardName: string;
  channel: string;
  channelId: string;
}

const MainBoardItem = ({
  boardName,
  channel,
  channelId,
}: MainBoardItemProps) => {
  const navigate = useNavigate();
  const { firstPost, isLoading } = useFirstPost({ channelId });

  return (
    <Flex
      color="black"
      alignItems="center"
      cursor="pointer"
      onClick={() => navigate(`/board/${channel}`)}
    >
      <Box width="140px" fontSize="1.5rem" fontWeight="medium">
        {boardName}
      </Box>
      <Box fontSize="1.2rem" fontWeight="medium">
        {firstPost
          ? !isLoading && JSON.parse(firstPost.title).title
          : '등록된 글이 없습니다.'}
      </Box>
    </Flex>
  );
};

export default MainBoardItem;
