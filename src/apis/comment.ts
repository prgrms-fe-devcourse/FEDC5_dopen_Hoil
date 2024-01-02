import { deleteRequest, postRequest } from './instance';

interface CreateCommentPayload {
  comment: string;
  postId: string;
}

export const createComment = async ({
  comment,
  postId,
}: CreateCommentPayload) =>
  await postRequest<Comment, CreateCommentPayload>('/comments/create', {
    comment,
    postId,
  });

export const deleteComment = async (id: string) => {
  await deleteRequest<Comment, { id: string }>('/comments/delete', { id });
};
