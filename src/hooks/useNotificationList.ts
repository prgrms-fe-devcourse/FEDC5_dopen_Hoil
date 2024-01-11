import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import {
  getUserNotificationList,
  NotificationType,
} from '@/apis/notifications';
import { NOTIFICATION_LIST } from '@/constants/queryKeys';
import { User, Notification } from '@/apis/type';

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
  const { data, isLoading, error } = useQuery<
    Notification[],
    AxiosError,
    MyNotificationListItem[]
  >(NOTIFICATION_LIST, getUserNotificationList, {
    suspense: true,
    useErrorBoundary: (error) => {
      //400과 401는 위임,나머지는 여기서
      return error.response?.status === 400 || error.response?.status === 401;
    },
    meta: {
      errorMessage: '오류',
    },
    select: (data) => {
      return data.map<MyNotificationListItem>((notify) => {
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
          throw new Error('type is invalid');
        }
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
