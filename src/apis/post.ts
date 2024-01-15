import { getItem } from '@/utils/storage';
import { deleteRequest, getRequest, postRequest, putRequest } from './instance';
import { Like, Post } from './type';
import { LOGIN_TOKEN } from '@/constants/user';

interface Limit {
  offset?: number;
  limit?: number;
}

export interface ChannelPayload extends Limit {
  channelId: string;
}

export const getPostListByChannel = async ({
  channelId,
  offset,
  limit,
}: ChannelPayload) =>
  await getRequest<Post[]>(`/posts/channel/${channelId}`, {
    params: { offset, limit },
  });

interface UserPayload extends Limit {
  userId: string;
}

export const getPostListByUser = async ({
  userId,
  offset,
  limit,
}: UserPayload) =>
  await getRequest<Post[]>(`/posts/author/${userId}`, {
    params: { offset, limit },
  });

export interface CreatePostPayload {
  title: string;
  image?: File | null;
  channelId: string;
}

export const createPost = async ({
  title,
  image = null,
  channelId,
}: CreatePostPayload) => {
  const formData = new FormData();
  formData.append('title', title);
  if (image !== null) {
    formData.append('image', image);
  }
  formData.append('channelId', channelId);

  await postRequest<Post, FormData>('/posts/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${getItem(LOGIN_TOKEN, '')}`,
    },
  });
};

interface EditPostPayload {
  postId: string;
  title: string;
  image?: File | null;
  imageToDeletePublicId?: string;
  channelId: string;
}
/**사진을 삭제하고 싶을 경우 imageToDeletePublicId에 imagePublicId 넣기*/
export const editPost = async ({
  postId,
  title,
  image = null,
  imageToDeletePublicId = '',
  channelId,
}: EditPostPayload) => {
  const formData = new FormData();
  formData.append('postId', postId);
  formData.append('title', title);
  if (image !== null) {
    formData.append('image', image);
  }
  formData.append('channelId', channelId);
  formData.append('imageToDeletePublicId', imageToDeletePublicId);
  await putRequest('/posts/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${getItem(LOGIN_TOKEN, '')}`,
    },
  });
};

export const deletePost = async (id: string) =>
  await deleteRequest('/posts/delete', { id });

export const getPostDetail = async (postId: string) =>
  await getRequest<Post>(`/posts/${postId}`);

export const createLike = async (postId: string) =>
  await postRequest<Like, { postId: string }>('/likes/create', { postId });
/**@id : 특정 Like의 _id값 */
export const deleteLike = async (id: string) => {
  await deleteRequest<Like, { id: string }>('/likes/delete', { id });
};
