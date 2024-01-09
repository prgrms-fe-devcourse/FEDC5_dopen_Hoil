import { useMutation, useQuery } from 'react-query';
import { checkAuthenticated } from '@/apis/authentication';
import { deleteComment } from '@/apis/comment';
import { getUserInfo } from '@/apis/userInfo';
import { Comment } from '@/apis/type';

export const useMyComment = () => {
  return useQuery<Comment[]>('my-comment', async () => {
    const { _id } = await checkAuthenticated();
    const userInfo = await getUserInfo(_id);

    const isCommentArray = (
      array: string[] | Comment[],
    ): array is Comment[] => {
      return array.length === 0 || typeof array[0] !== 'string';
    };

    if (!isCommentArray(userInfo.comments)) {
      throw new Error('반환 값이 일치하지 않습니다.');
    }

    return userInfo.comments;
  });
};

export const useDeleteComment = () => {
  return useMutation(deleteComment, {});
};
