import { getChannelList } from '@/apis/channel';
import { Channel } from '@/apis/type';
import { CHANNEL_LIST } from '@/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

export const useChannelList = () => {
  const { data, error } = useQuery<Channel[], AxiosError>(
    CHANNEL_LIST,
    getChannelList,
    {
      meta: {
        errorMessage: '채널 목록을 가져올 때 에러가 발생했습니다.',
      },
    },
  );

  const channelListData = data;

  return { channelListData, error };
};
