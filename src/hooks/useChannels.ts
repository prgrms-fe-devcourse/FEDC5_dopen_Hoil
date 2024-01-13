import { getChannelList } from '@/apis/channel';
import { Channel } from '@/apis/type';
import { CHANNEL, CHANNEL_LIST } from '@/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

export const useChannelList = () => {
  const { data, isError } = useQuery<Channel[], AxiosError>(
    CHANNEL_LIST,
    getChannelList,
    {
      meta: {
        errorMessage: '채널 목록을 가져올 때 에러가 발생했습니다.',
      },
      select: (data) =>
        data.filter(
          (channel) =>
            channel.description === '자유 게시판' ||
            channel.description === '인증 & 회고 게시판' ||
            channel.description === '정보 공유 게시판',
        ),
    },
  );

  const channelListData = data;

  return { channelListData, isError };
};

interface useChannelProps {
  channelInfo: string;
}

export const useChannelInfo = ({ channelInfo }: useChannelProps) => {
  const { data = [], isError } = useQuery<Channel[], AxiosError>(
    CHANNEL,
    getChannelList,
    {
      meta: {
        errorMessage: '채널 정보를 가져올 때 에러가 발생했습니다.',
      },
      select: (data) => data.filter((channel) => channel.name === channelInfo),
    },
  );

  const channel = data[0];

  return { channel, isError };
};
