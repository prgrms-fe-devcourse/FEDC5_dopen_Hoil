import { getRequest } from './instance';
import { Channel } from './type';
export const getChannelList = async () =>
  await getRequest<Channel[]>('/channels');

/**channelName 값이 한글일 경우, 인코딩 필요**/
export const getChannel = async (channelName: string) =>
  await getRequest<Channel[]>(`/channels/${channelName}`);
