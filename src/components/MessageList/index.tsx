import { useNavigate } from 'react-router-dom';
import { Flex, FlexProps } from '@chakra-ui/react';
import { useMessageList } from '@/hooks/useMessageList';
import UserContentBlock from '../common/UserContentBlock';

interface MessageListProps extends FlexProps {}

const MessageList = ({ ...props }: MessageListProps) => {
  const navigate = useNavigate();
  const { userDataList } = useMessageList();

  return (
    <Flex flexDir="column" overflowY="auto" {...props}>
      {userDataList?.map(
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
      )}
    </Flex>
  );
};
export default MessageList;
