import { useQuery } from 'react-query';
import {
  getUserNotificationList,
  NotificationType,
} from '@/apis/notifications';
import { User } from '@/apis/type';
export interface MyNotificationListItem {
  type: NotificationType;
  author: User;
  date: string; //UTC
  _id: string;
}

export const messageByTypes: { [key in NotificationType]: string } = {
  MESSAGE: '회원님에게 메시지를 보냈습니다.',
  COMMENT: '회원님의 게시물에 댓글을 남겼습니다.',
  FOLLOW: '회원님을 팔로우하기 시작했습니다 ',
  LIKE: '회원님의 게시물에 좋아요를 보냈습니다',
};

export const useNotificationList = () => {
  const { data, isLoading, error } = useQuery(
    'notificationList',
    getUserNotificationList,
    {
      useErrorBoundary: true,
    },
  );

  const initialData = data ?? [];

  const myNotificationList: MyNotificationListItem[] = initialData.map(
    (notify) => {
      //TODO : FOLLOW 및 LIKE에 대한 알림 확인 필요

      const { createdAt: date, _id, author } = notify;

      if (notify.message) {
        return { type: 'MESSAGE', author, date, _id };
      }

      if (notify.comment) {
        return { type: 'COMMENT', author, date, _id };
      }

      if (notify.follow) {
        return { type: 'FOLLOW', author, date, _id };
      } else {
        throw new Error('notify type is invalid!');
      }
    },
  );

  return {
    myNotificationList,
    isLoading,
    error,
  };
};
