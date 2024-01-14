import { getRequest, postRequest } from './instance';
import { Channel, CreateChannelRequestBody } from './type';
export const getChannelList = async () =>
  await getRequest<Channel[]>('/channels');

/**channelName 값이 한글일 경우, 인코딩 필요**/
export const getChannel = async (channelName: string) =>
  await getRequest<Channel[]>(`/channels/${channelName}`);

export const createChannel = async (username: string) =>
  await postRequest<Channel, CreateChannelRequestBody>('/channels/create', {
    authRequired: true,
    description: `${username}님의 타이머 채널입니다.`,
    name: `${username}`,
  });
