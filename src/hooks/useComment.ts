import { useMutation, useQueryClient } from 'react-query';
import { createComment, deleteComment } from '@/apis/comment';
import { pushNotification } from '@/apis/notifications';
import { POST_DETAIL } from '@/constants/queryKeys';

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const { mutate, isSuccess } = useMutation(createComment, {
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
  return {
    pushComment: mutate,
    isSuccess,
  };
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(POST_DETAIL);
    },
    onError: () => {
      alert('삭제에 실패했습니다. 다시 시도해주세요');
    },
  });
  return mutate;
};
