import { getMessageListByUser } from '@/apis/message';
import { useQuery } from 'react-query';

export const useMessage = (userId: string) => {
  //data는 시간을 기준으로 오름차순 정렬되어서 나옴
  const { isLoading, error, data } = useQuery(
    'message',
    async () => await getMessageListByUser(userId),
  );

  const messageLogs = data?.map(({ message, sender, receiver }) => {
    if (import.meta.env.VITE_APP_TESTID === sender._id) {
      return { message, type: 'sent' };
    }
    if (import.meta.env.VITE_APP_TESTID === receiver._id) {
      return { message, type: 'received' };
    }
  });

  return { isLoading, error, messageLogs };
};
