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
        posts?.filter(({ createdAt }) => {
          // toLocaleDateString으로 YYYY-M-D(예시 2024-1-8)로 변환 후
          // 포스트 createdAt(YYYY-M-DTHH:MM:SS)로 넘어온 값을 T기준으로 잘라서 비교
          const currentDate = new Date().toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
          const parsedKrTimePostDate = new Date(createdAt).toLocaleDateString(
            'en-CA',
            {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            },
          );
          return currentDate === parsedKrTimePostDate;
        })?.[0],
      refetchOnWindowFocus: false,
    },
  );
};
