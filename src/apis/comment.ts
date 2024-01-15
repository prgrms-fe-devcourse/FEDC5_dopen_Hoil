import { deleteRequest, postRequest } from './instance';
import { TComment } from './type';

interface CreateCommentPayload {
  comment: string;
  postId: string;
}

export const createComment = async ({
  comment,
  postId,
}: CreateCommentPayload) =>
  await postRequest<TComment, CreateCommentPayload>('/comments/create', {
    comment,
    postId,
  });

export const deleteComment = async (id: string) => {
  await deleteRequest<TComment, { id: string }>('/comments/delete', { id });
};
