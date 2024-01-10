import { useQuery } from 'react-query';
import { getUserNotificationList } from '@/apis/notifications';

export const useNotificationList = () => {
  const { data, isLoading, error } = useQuery(
    'notificationList',
    getUserNotificationList,
    {
      useErrorBoundary: true,
    },
  );

  const notificationList = data?.map((notify) => {
    //TODO : FOLLOW 및 LIKE에 대한 알림 확인 필요
    const { username } = notify.author;
    const date = notify.createdAt;

    if (notify.message) {
      return { type: 'MESSAGE', username, date };
    }

    if (notify.comment) {
      return { type: 'COMMENT', username, date };
    }

    if (notify.follow) {
      return { type: 'FOLLOW', username, date };
    }
  });

  return {
    notificationList,
    isLoading,
    error,
  };
};
