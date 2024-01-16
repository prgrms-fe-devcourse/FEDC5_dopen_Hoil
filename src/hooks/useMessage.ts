import { useQueryClient, useQuery, useMutation } from 'react-query';
import { getMessageListByUser, sendMessage } from '@/apis/message';
import { convertDateToString } from '@/utils/convertDateToString';
import { MESSAGE } from '@/constants/queryKeys';

interface MessageLog {
  time: string;
  message: string;
  _id: string;
  type: 'sent' | 'received';
}

export const useMessage = (userId: string) => {
  const { data: messageList } = useQuery(
    [MESSAGE, userId],
    async () => await getMessageListByUser(userId),
    {
      select: (data) => {
        const messageLogs = new Map<string, MessageLog[]>();

        data?.forEach(({ message, sender, _id, createdAt }) => {
          const { date, time } = convertDateToString(new Date(createdAt));
          const type = userId === sender._id ? 'sent' : 'received';

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
        return Array.from(messageLogs.entries());
      },
      suspense: true,
      useErrorBoundary: true,
    },
  );

  return messageList || [];
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const { mutate: sendMessageMutation } = useMutation(sendMessage, {
    onSuccess: async (data, { receiver }) => {
      queryClient.invalidateQueries([MESSAGE, receiver]);
      return data;
    },
  });

  return sendMessageMutation;
};
