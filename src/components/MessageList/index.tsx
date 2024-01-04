import { useMessageList } from '@/hooks/useMessageList';
import UserContentBlockList from '@/components/common/UserContentBlockList';

const MessageList = () => {
  const { isLoading, error, userDataList } = useMessageList();
  //TODO: 로딩 및 에러처리 세부 구현
  if (isLoading) {
    return <div>로딩중...</div>;
  }
  if (error) {
    return <div>에러가 발생했습니다</div>;
  }
  return (
    <>{userDataList && <UserContentBlockList userDataList={userDataList} />}</>
  );
};
export default MessageList;
