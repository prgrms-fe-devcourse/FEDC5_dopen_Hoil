import { getRequest } from './instance';
import { Post, User } from './type';

export const searchByUser = async (user: string) =>
  await getRequest<User>(`/search/users/${user}`);

export const searchByAllType = async (type: string) => {
  await getRequest<(User | Post)[]>(`/search/all/${type}`);
};
