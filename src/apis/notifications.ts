import { getRequest, postRequest, putRequest } from './instance';
import { Notification } from './type';

export const getUserNotificationList = async () =>
  await getRequest<Notification[]>('/notifications');

export const checkNotification = async () =>
  await putRequest('/notifications/seen');

export type NotificationType = 'COMMENT' | 'FOLLOW' | 'LIKE' | 'MESSAGE';
export interface PushNotificationPayload {
  notificationType: NotificationType;
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
