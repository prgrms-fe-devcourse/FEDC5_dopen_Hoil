import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
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
    <Box w="100%" m="0 auto" textAlign="center" p="130px 20px">
      <LoginLogoTitle />
      <LoginForm />
      <LoginFindCredentials />
      <LoginDivider />
      <LoginWithSocial />
    </Box>
  );
};

export default Login;
