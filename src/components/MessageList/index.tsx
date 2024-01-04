import { useMessageList } from '@/hooks/useMessageList';
import { calculateTimeDiff } from './calculateTimeDiff';
import UserContentBlockList from '@/components/common/UserContentBlockList';

const MessageList = () => {
  const { isLoading, error, data: messageList } = useMessageList();
  const userDataList = messageList?.map(
    ({ createdAt, message, sender, receiver }) => {
      //TODO : 로그인한 유저의 정보 받아와서 비교
      const otherType = sender._id === 'test' ? receiver : sender;
      return {
        coverImage: otherType.coverImage,
        username: otherType.username,
        content: message,
        subContent: calculateTimeDiff(createdAt) || '',
      };
    },
  );
  //TODO : 에러처리 수정 필요
  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (error) {
    return <div>Error Occured</div>;
  }

  return (
    <>{userDataList && <UserContentBlockList userDataList={userDataList} />}</>
  );
};
export default MessageList;
