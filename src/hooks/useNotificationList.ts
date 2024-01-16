import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import {
  getUserNotificationList,
  NotificationType,
} from '@/apis/notifications';
import { NOTIFICATION_LIST } from '@/constants/queryKeys';
import { User, Notification } from '@/apis/type';
import { useCheckUserAuth } from './useAuth';

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
  const { data: myInfo } = useCheckUserAuth();
  const { data, isLoading, error } = useQuery<
    Notification[],
    AxiosError,
    MyNotificationListItem[]
  >([NOTIFICATION_LIST, myInfo?._id], getUserNotificationList, {
    suspense: true,
    useErrorBoundary: true,
    refetchOnWindowFocus: true,

    select: (data) => {
      return data.map<MyNotificationListItem>((notify) => {
        const { createdAt: date, _id, author, seen } = notify;
        if (notify.message) {
          return { type: 'MESSAGE', author, date, _id, seen };
        }

        if (notify.comment) {
          return { type: 'COMMENT', author, date, _id, seen };
        }

        if (notify.follow) {
          return { type: 'FOLLOW', author, date, _id, seen };
        }

        if (notify.like) {
          return { type: 'LIKE', author, date, _id, seen };
        }

        return { type: 'MESSAGE', author, date, _id, seen };
      });
    },
  });

  const myNotificationList = data ?? [];

  return {
    myNotificationList,
    isLoading,
    error,
  };
};
