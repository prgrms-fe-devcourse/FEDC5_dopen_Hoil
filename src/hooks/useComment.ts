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
  });
};

export const useDeleteComment = ({ onSuccessFn }: CommentProps) => {
  return useMutation(deleteComment, {
    onSuccess: () => {
      if (onSuccessFn) {
        onSuccessFn();
      }
    },
  });
};
