import { User } from '@/apis/type';

export const userInfoCheck = (
  userList: User[],
  info: keyof User,
  newInfo: string,
): boolean => {
  return userList.some((user) => {
    if (
      info in user &&
      typeof user[info] === 'string' &&
      user[info] === newInfo
    ) {
      return true; // 조건이 일치하는 경우에만 true를 반환합니다.
    }
  });
};
