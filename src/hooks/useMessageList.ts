import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { getMessageList } from '@/apis/message';
import { Conversation } from '@/apis/type';
import { calculateTimeDiff } from '@/utils/calculateTimeDiff';
import { MESSAGE_LIST } from '@/constants/queryKeys';
import { useCheckUserAuth } from './useAuth';

export const useMessageList = () => {
  const { data: myInfo } = useCheckUserAuth();

  const {
    isLoading,
    error,
    data: messageList,
  } = useQuery<Conversation[], AxiosError>(MESSAGE_LIST, getMessageList);

  const userDataList = messageList?.map(
    ({ createdAt, message, sender, receiver }) => {
      const otherType = sender._id === myInfo?._id ? receiver : sender;

      return {
        key: createdAt,
        userImage: otherType.coverImage,
        username: otherType.username,
        content: message,
        subContent: calculateTimeDiff(createdAt) || '',
        userId: otherType._id,
      };
    },
  );
  return { isLoading, error, userDataList };
};
