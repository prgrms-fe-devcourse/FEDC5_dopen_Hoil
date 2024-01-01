import { postRequest } from '@/apis/instance';
import { User } from '@/apis/type';

interface LogIn {
  email: string;
  password: string;
}

interface SignUp extends LogIn {
  fullName: string;
}

interface LogInResponse {
  user: User;
  token: string;
}

export const signUp = async ({ email, password, fullName }: SignUp) => {
  return await postRequest<LogInResponse, SignUp>('/signup', {
    email,
    password,
    fullName,
  });
};

export const logIn = async ({ email, password }: LogIn) => {
  return await postRequest<LogInResponse, LogIn>('/login', {
    email,
    password,
  });
};

export const logOut = async () => {
  return await postRequest('/logout');
};
