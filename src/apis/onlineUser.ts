import { getRequest } from './instance';
import { User } from './type';

export const getOnlineUsers = async () =>
  await getRequest<User[]>('/users/online-users');
