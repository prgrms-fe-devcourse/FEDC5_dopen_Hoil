import { useQuery } from 'react-query';
import { MYPOST_LIST, POST_DETAIL } from '@/constants/queryKeys';
import { checkAuthenticated } from '@/apis/authentication';
import { getPostDetail } from '@/apis/post';

interface PostDetailProps {
  id: string;
}

export const useMyPostList = () => {
  return useQuery(MYPOST_LIST, async () => {
    const { posts } = await checkAuthenticated();

    return posts;
  });
};

export const usePostDetail = ({ id }: PostDetailProps) => {
  const { data, error } = useQuery(
    POST_DETAIL,
    async () => await getPostDetail(id),
    {
      suspense: true,
      useErrorBoundary: true,
      meta: {
        errorMessage: '네트워크 오류',
      },
      retry: 0,
      select: (data) => {
        if (data._id === '') {
          throw new Error('해당하는 글이 존재하지 않습니다');
        }
        return {
          _id: data._id,
          title: data.title,
          likes: data.likes,
          comments: data.comments,
          author: data.author,
          createdAt: data.createdAt,
        };
      },
    },
  );

  return {
    ...data!,
    error,
  };
};
