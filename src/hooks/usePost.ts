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
      select: ({ _id, title, likes, comments, author, createdAt }) => {
        return {
          _id,
          title,
          likes,
          comments,
          author,
          createdAt,
        };
      },
    },
  );

  return {
    ...data!,
    error,
  };
};
