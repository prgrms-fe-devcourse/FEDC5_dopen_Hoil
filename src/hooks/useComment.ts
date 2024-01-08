import { useMutation, useQuery } from 'react-query';
import { checkAuthenticated } from '@/apis/authentication';
import { deleteComment } from '@/apis/comment';
import { getUserInfo } from '@/apis/userInfo';

export const useMyComment = () => {
  return useQuery('my-comment', async () => {
    const { _id } = await checkAuthenticated();
    return await getUserInfo(_id);
  });
};

export const useDeleteComment = () => {
  return useMutation(deleteComment, {});
};
