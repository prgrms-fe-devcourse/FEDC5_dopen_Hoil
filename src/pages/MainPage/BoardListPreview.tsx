import { ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Flex, Spinner, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import BoardListPreviewItem from '@/pages/MainPage/BoardListPreviewItem';
import { useChannelList } from '@/hooks/useChannels';

const BoardListPreview = () => {
  const { channelListData = [], isLoading } = useChannelList();
  const navigate = useNavigate();

  return (
    <Flex w="100%" marginTop="30px" direction="column">
      <Flex
        borderBottom="1px"
        borderColor="gray.450"
        paddingBottom="23px"
        justifyContent="space-between"
      >
        <Text fontSize="3xl" fontWeight="medium" cursor="default">
          게시판
        </Text>
        <Button
          fontSize="md"
          bg="transparent"
          onClick={() => navigate('/board')}
        >
          더 보기 <ChevronRightIcon />
        </Button>
      </Flex>
      <Flex paddingTop="23px" gap="10px" direction="column">
        {isLoading ? (
          <Spinner />
        ) : (
          channelListData.map((item) => (
            <BoardListPreviewItem
              key={item._id}
              channel={item.name}
              channelId={item._id}
              boardName={item.description}
            />
          ))
        )}
      </Flex>
    </Flex>
  );
};

export default BoardListPreview;
