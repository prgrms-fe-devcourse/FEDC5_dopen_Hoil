import { User } from '@/apis/type';

export const userInfoCheck = (
  userList: User[],
  info: keyof User,
  changeInfo: string,
): boolean => {
  const isDuplicate = userList.some((user) => {
    if (info in user && typeof user[info] === 'string') {
      return user[info] === changeInfo;
    }
  });

  return isDuplicate;
};
