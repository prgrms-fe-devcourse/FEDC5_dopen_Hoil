import { getRequest, postRequest, putRequest } from './instance';
import { Notification } from './type';

export const getUserNotificationList = async () =>
  await getRequest<Notification>('/notifications');

export const checkNotification = async () =>
  await putRequest('/notifications/seen');

interface PushNotificationPayload {
  notificationType: 'COMMENT' | 'FOLLOW' | 'LIKE' | 'MESSAGE';
  notificationTypeId: string;
  userId: string;
  postId: string | null;
}

export const pushNotification = async ({
  notificationType,
  notificationTypeId,
  userId,
  postId,
}: PushNotificationPayload) =>
  await postRequest<Notification, PushNotificationPayload>(
    '/notifications/create',
    {
      notificationType,
      notificationTypeId,
      userId,
      postId: notificationType === 'FOLLOW' ? null : postId,
    },
  );
