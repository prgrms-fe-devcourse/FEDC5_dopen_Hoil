import { useMutation, useQueryClient } from 'react-query';
import { createComment, deleteComment } from '@/apis/comment';
import { pushNotification } from '@/apis/notifications';
import { MY_COMMENT_LIST, POST_DETAIL } from '@/constants/queryKeys';

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(createComment, {
    onSuccess: async (data) => {
      await pushNotification({
        notificationType: 'COMMENT',
        notificationTypeId: data._id,
        userId: data.author._id,
        postId: data.post,
      });
      queryClient.invalidateQueries([POST_DETAIL, data.post]);
    },
    onError: () => {
      alert('저장에 실패했습니다. 다시 시도해주세요');
    },
  });
  return mutate;
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(POST_DETAIL);
      queryClient.invalidateQueries(MY_COMMENT_LIST);
    },
    onError: () => {
      alert('삭제에 실패했습니다. 다시 시도해주세요');
    },
  });
  return mutate;
};
