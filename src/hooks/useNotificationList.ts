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

  const notificationList = data
    ?.map((notify) => {
      //TODO : FOLLOW 및 LIKE에 대한 알림 확인 필요
      const author = notify.author.username;
      if (notify.message) {
        return { type: 'MESSAGE', author };
      }

      if (notify.comment) {
        return { type: 'COMMENT', author };
      }

      if (notify.follow) {
        return { type: 'FOLLOW', author };
      }
    })
    .filter((item) => item === undefined);

  return {
    notificationList,
    isLoading,
    error,
  };
};
