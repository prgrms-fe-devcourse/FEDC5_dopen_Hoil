import { useMessage } from '@/hooks/useMessage';
import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
const Message = () => {
  const { userId } = useParams();
  const { isLoading, error, messageLogs } = useMessage(userId!);
  //TODO: 로딩 및 에러처리 세부 구현
  if (isLoading) {
    return <div>로딩중...</div>;
  }
  if (error) {
    return <div>에러가 발생했습니다</div>;
  }

  return (
    <Flex flexDir="column" gap="10px" bgColor="gray.200">
      {messageLogs?.map((log) => {
        return (
          <Box
            key={log?._id}
            maxW="200px"
            p="4"
            bgColor={log?.type === 'received' ? '#ffffff' : 'pink.300'}
            alignSelf={log?.type === 'received' ? 'flex-start' : 'flex-end'}
          >
            {log?.message}
          </Box>
        );
      })}
    </Flex>
  );
};

export default Message;

//GetMessage - 내가 보낸 메시지, 내가 받은 메시지 확인 가능
//해당 사람과의 최근 내역만 보여줌..?
//userId - 쌍방 소통 확인 가능
