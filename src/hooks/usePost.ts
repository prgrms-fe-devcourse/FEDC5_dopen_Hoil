import { useMutation, useQuery } from 'react-query';
import { MYPOST_LIST, POST_DETAIL } from '@/constants/queryKeys';
import { checkAuthenticated } from '@/apis/authentication';
import { createPost, getPost } from '@/apis/post';

interface PostDetailProps {
  id: string;
}

interface PostingProps {
  onSuccessFn?: () => void;
}

export const useMyPostList = () => {
  return useQuery(MYPOST_LIST, async () => {
    const { posts } = await checkAuthenticated();

    return posts;
  });
};

export const usePostDetail = ({ id }: PostDetailProps) => {
  const { data, error } = useQuery(
    [POST_DETAIL, id],
    async () => await getPost(id),
    {
      suspense: true,
      useErrorBoundary: true,
      meta: {
        errorMessage: '네트워크 오류',
      },
      retry: 0,
      refetchOnWindowFocus: false,
      select: (data) => {
        if (!data) {
          throw new Error('해당하는 글이 존재하지 않습니다');
        }
        return {
          _id: data._id,
          title: data.title,
          content: data.content,
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

export const usePosting = ({ onSuccessFn }: PostingProps) => {
  return useMutation(createPost, {
    onSuccess: () => {
      if (onSuccessFn) {
        onSuccessFn();
      }
    },
    onError: () => {
      alert('글 등록 중 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.');
    },
  });
};
