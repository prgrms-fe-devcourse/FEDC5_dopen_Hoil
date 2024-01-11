import { getChannelList } from '@/apis/channel';
import { Channel } from '@/apis/type';
import { CHANNEL_LIST } from '@/constants/queryKeys';
import { useQuery } from 'react-query';

export const useChannelList = () => {
  const { data } = useQuery<Channel[]>(CHANNEL_LIST, getChannelList);

  const channelListData = data;

  return { channelListData };
};
