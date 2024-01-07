import { useQuery } from 'react-query';
import { getMessageListByUser } from '@/apis/message';
import { convertDateToString } from '@/utils/convertDateToString';

interface Message {
  time: string;
  message: string;
  _id: string;
  type: 'sent' | 'received';
}

export const useMessage = (userId: string) => {
  const { isLoading, error, data } = useQuery(
    'message',
    async () => await getMessageListByUser(userId),
  );

  const messageLogs = new Map<string, Message[]>();

  data?.forEach(({ message, sender, _id, createdAt }) => {
    const { date, time } = convertDateToString(new Date(createdAt));
    const type =
      import.meta.env.VITE_APP_TESTID === sender._id ? 'sent' : 'received';

    const existingMessages = messageLogs.get(date);
    if (existingMessages) {
      messageLogs.set(date, [
        ...existingMessages,
        { _id, message, type, time },
      ]);
    } else {
      messageLogs.set(date, [{ _id, message, type, time }]);
    }
  });

  return { isLoading, error, messageLogs: Array.from(messageLogs.entries()) };
};
