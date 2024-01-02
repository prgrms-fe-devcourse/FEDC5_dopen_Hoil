import { deleteRequest, postRequest } from './instance';
import { Follow } from './type';

export const followUser = async (userId: string) =>
  await postRequest<Follow, { userId: string }>('/follow/create', {
    userId,
  });

export const unfollowUser = async (id: string) =>
  await deleteRequest<Follow, { id: string }>('/follow/delete', { id });
