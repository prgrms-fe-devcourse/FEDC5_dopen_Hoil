import { getRequest, postRequest, putRequest } from './instance';
import { Conversation, Message } from './type';

export const getMessageList = async () =>
  await getRequest<Conversation[]>('/messages/conversations');

export const getMessageListByUser = async (userId: string) =>
  await getRequest<Message[]>('/messages', {
    params: {
      userId,
    },
  });

interface SendMessagePayload {
  message: string;
  receiver: string;
}

export const sendMessage = async ({ message, receiver }: SendMessagePayload) =>
  await postRequest<Message, SendMessagePayload>('/messages/create', {
    message,
    receiver,
  });

export const checkMessage = async (sender: string) =>
  await putRequest('/messages/update-seen', { sender });
