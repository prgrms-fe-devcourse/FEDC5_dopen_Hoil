import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { getMessageList } from '@/apis/message';
import { Conversation } from '@/apis/type';

export const useMessageList = () => {
  const { isLoading, error, data } = useQuery<Conversation[], AxiosError>(
    'messageList',
    getMessageList,
  );
  return { isLoading, error, data };
};
