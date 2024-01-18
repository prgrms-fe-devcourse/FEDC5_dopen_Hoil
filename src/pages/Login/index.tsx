import { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { LOGIN_TOKEN } from '@/constants/user';
import { getItem, removeItem } from '@/utils/storage';

import LoginLogoTitle from './LoginLogoTitle';
import LoginForm from './LoginForm';
import LoginFindCredentials from './LoginFindCredentials';
import LoginWithSocial from './LoginWithSocial';
import LoginDivider from './LoginDivider';

const Login = () => {
  useEffect(() => {
    if (getItem(LOGIN_TOKEN, '')) {
      removeItem(LOGIN_TOKEN);
    }
  }, []);

  return (
    <Flex flexDir="column" w="100%" textAlign="center" p="0 20px">
      <LoginLogoTitle />
      <LoginForm />
      <LoginFindCredentials />
      <LoginDivider />
      <LoginWithSocial />
    </Flex>
  );
};

export default Login;
