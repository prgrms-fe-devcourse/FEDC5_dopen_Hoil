import { checkAuthenticated } from '@/apis/authentication';
import { User } from '@/apis/type';
import { useEffect, useState } from 'react';

interface userInfoType {
  image: string;
  email: string;
  fullName: string;
  username: string;
}

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<userInfoType>({
    image: '',
    email: '',
    fullName: '',
    username: '',
  });

  useEffect(() => {
    const getUserInfo = async () => {
      const user: User = await checkAuthenticated();

      const userInfo: userInfoType = {
        image: user.image,
        email: user.email,
        fullName: user.fullName,
        username: user.username,
      };

      setUserInfo(userInfo);
    };

    getUserInfo();
  }, []);

  return userInfo;
};

export default useUserInfo;
