import { useNavigate } from 'react-router-dom';
import { AbsoluteCenter, Flex, FlexProps, Text } from '@chakra-ui/react';
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
        <AbsoluteCenter>
          <Text fontSize="1.5rem" as="b">
            표시할 알림이 없습니다
          </Text>
        </AbsoluteCenter>
      )}
    </Flex>
  );
};
export default MessageList;
