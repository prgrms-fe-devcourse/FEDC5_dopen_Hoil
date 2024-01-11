import { getPostListByChannel } from '@/apis/post';
import { Post } from '@/apis/type';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

export const useTodayTimePost = (channelId: string) => {
  return useQuery<Post[], AxiosError, Post>(
    ['today-time-post'],
    () => getPostListByChannel({ channelId }),
    {
      meta: {
        errorMessage: '오늘의 타이머 게시글 가져오는 도중 오류발생',
      },
      select: (posts) =>
        posts.filter((post) => {
          const currentDate = new Date().toLocaleDateString('en-CA');
          return post.createdAt.split('T')[0] === currentDate;
        })?.[0],
      refetchOnWindowFocus: false,
    },
  );
};
