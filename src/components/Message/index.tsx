import { useMessage } from '@/hooks/useMessage';
import { Box, Flex, Text, BoxProps } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const Message = ({ gap = '5', ...props }: BoxProps) => {
  const { userId } = useParams();
  const { isLoading, error, messageLogs } = useMessage(userId!);
  const [sentMessageColor, receivedMessageColor] = ['white', 'pink.300'];
  //TODO: 로딩 및 에러처리 세부 구현
  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다</div>;
  }

  return (
    <Box bgColor="gray.300" {...props}>
      <Flex flexDir="column" gap={gap}>
        {messageLogs?.map((log) => {
          return (
            <Box
              key={log?._id}
              maxW="200px"
              borderRadius="5"
              p="4"
              bgColor={
                log?.type === 'received'
                  ? sentMessageColor
                  : receivedMessageColor
              }
              alignSelf={log?.type === 'received' ? 'flex-start' : 'flex-end'}
            >
              <Text>{log?.message}</Text>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};

export default Message;
