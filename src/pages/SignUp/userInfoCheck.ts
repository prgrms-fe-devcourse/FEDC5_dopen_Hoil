import { User } from '@/apis/type';

export const isUserInfoCheck = (
  userList: User[],
  info: keyof User,
  newInfo: string,
): boolean => {
  return userList.some(
    (user) =>
      info in user && typeof user[info] === 'string' && user[info] === newInfo,
  );
};
