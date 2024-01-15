import { useMutation } from 'react-query';
import { createComment, deleteComment } from '@/apis/comment';

interface CommentProps {
  onSuccessFn?: () => void;
}

export const useCreateComment = ({ onSuccessFn }: CommentProps) => {
  return useMutation(createComment, {
    onSuccess: () => {
      if (onSuccessFn) {
        onSuccessFn();
      }
    },
    onError: () => {
      alert('저장에 실패했습니다. 다시 시도해주세요');
    },
  });
};

export const useDeleteComment = ({ onSuccessFn }: CommentProps) => {
  return useMutation(deleteComment, {
    onSuccess: () => {
      if (onSuccessFn) {
        onSuccessFn();
      }
    },
    onError: () => {
      alert('삭제에 실패했습니다. 다시 시도해주세요');
    },
  });
};
