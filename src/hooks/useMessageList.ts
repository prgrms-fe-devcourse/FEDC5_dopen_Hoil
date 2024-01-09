import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { getMessageList } from '@/apis/message';
import { Conversation } from '@/apis/type';
import { calculateTimeDiff } from '@/utils/calculateTimeDiff';
import { MESSAGE_LIST } from '@/constants/queryKeys';

export const useMessageList = () => {
  const { isLoading, error, data } = useQuery<Conversation[], AxiosError>(
    MESSAGE_LIST,
    getMessageList,
  );
  const userDataList = data?.map(({ createdAt, message, sender, receiver }) => {
    //TODO : 로그인한 유저의 실제 _id 받아와서 비교
    const otherType =
      sender._id === import.meta.env.VITE_APP_TESTID ? receiver : sender;

    return {
      key: createdAt,
      userImage: otherType.coverImage,
      username: otherType.username,
      content: message,
      subContent: calculateTimeDiff(createdAt) || '',
      userId: otherType._id,
    };
  });
  return { isLoading, error, userDataList };
};
