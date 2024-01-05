import { useNavigate } from 'react-router-dom';
import { Flex, FlexProps } from '@chakra-ui/react';
import { useMessageList } from '@/hooks/useMessageList';
import UserContentBlock from '../common/UserContentBlock';

const MessageList = ({ ...props }: FlexProps) => {
  const navigate = useNavigate();
  const { isLoading, error, userDataList } = useMessageList();
  //TODO: 로딩 및 에러처리 세부 구현
  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다</div>;
  }

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
            ></UserContentBlock>
          );
        },
      )}
    </Flex>
  );
};
export default MessageList;
