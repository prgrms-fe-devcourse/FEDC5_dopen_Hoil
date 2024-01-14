import { useMutation, useQueryClient } from 'react-query';
import { createLike, deleteLike } from '@/apis/post';
import { AUTH, POST_DETAIL } from '@/constants/queryKeys';
import { usePostDetail } from './usePost';
import { useCheckUserAuth } from './useAuth';

//일단 유저의 Like에서 눌렀는지를 찾아야함

export const useLike = (postId: string) => {
  const queryClient = useQueryClient();
  const { data: myInfo } = useCheckUserAuth();
  const { likes } = usePostDetail({
    id: postId!,
  });
  const clicked = likes.filter((like) => like.user === myInfo?._id);
  const { mutate: setLike } = useMutation(
    async () => {
      if (!clicked.length) {
        await createLike(postId);
      } else {
        await deleteLike(clicked[0]._id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([POST_DETAIL, postId]);
        queryClient.invalidateQueries(AUTH);
      },
    },
  );
  return { countLike: likes.length, setLike };
};
