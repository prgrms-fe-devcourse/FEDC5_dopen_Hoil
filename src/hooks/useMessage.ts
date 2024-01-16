import { useQueryClient, useQuery, useMutation } from 'react-query';
import { getMessageListByUser, sendMessage } from '@/apis/message';
import { convertDateToString } from '@/utils/convertDateToString';
import { MESSAGE } from '@/constants/queryKeys';
import { pushNotification } from '@/apis/notifications';

interface MessageLog {
  time: string;
  message: string;
  _id: string;
  type: 'sent' | 'received';
}

export const useMessage = (userId: string) => {
  const queryClient = useQueryClient();
  const { data } = useQuery(
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

  const { mutate } = useMutation(sendMessage, {
    onSuccess: async (data) => {
      queryClient.invalidateQueries([MESSAGE, userId]);
      await pushNotification({
        notificationType: 'MESSAGE',
        notificationTypeId: data._id,
        userId: userId,
        postId: data._id,
      });
    },
  });

  if (data === undefined) {
    throw new Error('해당하는 메시지가 없습니다');
  }

  return {
    messageLogs: data,
    sendMessageMutate: mutate,
  };
};
