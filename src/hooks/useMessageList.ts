import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { getMessageList } from '@/apis/message';
import { Conversation } from '@/apis/type';
import { calculateTimeDiff } from '@/components/MessageList/calculateTimeDiff';
export const useMessageList = () => {
  const { isLoading, error, data } = useQuery<Conversation[], AxiosError>(
    'messageList',
    getMessageList,
  );
  const userDataList = data?.map(({ createdAt, message, sender, receiver }) => {
    //TODO : 로그인한 유저의 실제 _id 받아와서 비교
    const otherType = sender._id === 'test' ? receiver : sender;
    return {
      userImage: otherType.coverImage,
      username: otherType.username,
      content: message,
      subContent: calculateTimeDiff(createdAt) || '',
    };
  });
  return { isLoading, error, userDataList };
};
