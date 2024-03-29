import { useMutation, useQueryClient } from 'react-query';
import { createLike, deleteLike } from '@/apis/post';
import { AUTH, POST_DETAIL } from '@/constants/queryKeys';
import { usePostDetail } from './usePost';
import { useCheckUserAuth } from './useAuth';

export const useLike = (postId: string) => {
  const queryClient = useQueryClient();
  const { data: myInfo } = useCheckUserAuth();
  const {
    data: { likes },
  } = usePostDetail({
    id: postId!,
    enabled: !!postId,
  });
  const clicked = likes.filter((like) => like.user === myInfo?._id);
  const mutate = useMutation(
    async () => {
      if (!clicked.length) {
        return await createLike(postId);
      } else {
        return await deleteLike(clicked[0]._id);
      }
    },
    {
      onError: () => {
        alert('잠시 후에 시도해주세요');
      },
      onSettled: () => {
        queryClient.invalidateQueries([POST_DETAIL, postId]);
        queryClient.invalidateQueries(AUTH);
      },
    },
  );

  return {
    countLike: likes.length,
    mutateAsync: mutate.mutateAsync,
    clicked: clicked.length > 0,
  };
};
