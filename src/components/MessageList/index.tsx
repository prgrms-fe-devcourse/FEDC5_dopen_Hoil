import { useNavigate } from 'react-router-dom';
import { Box, Flex, FlexProps } from '@chakra-ui/react';
import { useMessageList } from '@/hooks/useMessageList';
import UserContentBlock from '../common/UserContentBlock';

interface MessageListProps extends FlexProps {}

const MessageList = ({ ...props }: MessageListProps) => {
  const navigate = useNavigate();
  const messageLogList = useMessageList();

  return (
    <Flex flexDir="column" overflowY="auto" {...props}>
      {messageLogList.length ? (
        messageLogList.map(
          ({ key, userImage, username, content, subContent, userId }) => {
            return (
              <UserContentBlock
                key={key}
                userImage={userImage}
                username={username}
                content={content}
                subContent={subContent}
                onClick={() => navigate(`./${userId}`)}
                ellipsis={2}
              ></UserContentBlock>
            );
          },
        )
      ) : (
        <Box>메시지가 없습니다</Box>
      )}
    </Flex>
  );
};
export default MessageList;
