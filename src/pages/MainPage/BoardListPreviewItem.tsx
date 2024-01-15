import { useFirstPost } from '@/hooks/usePost';
import { Box, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface BoardListPreviewItemProps {
  boardName: string;
  channel: string;
  channelId: string;
}

const BoardListPreviewItem = ({
  boardName,
  channel,
  channelId,
}: BoardListPreviewItemProps) => {
  const navigate = useNavigate();
  const { firstPostTitle, isLoading } = useFirstPost({ channelId });

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
        {!isLoading && firstPostTitle}
      </Box>
    </Flex>
  );
};

export default BoardListPreviewItem;
