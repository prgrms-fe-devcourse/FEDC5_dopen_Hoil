import { postRequest } from '@/apis/instance';
import { User } from '@/apis/type';

interface LogIn {
  email: string;
  password: string;
}

interface SignUp extends LogIn {
  fullName: string;
  username: string;
}

interface LogInResponse {
  user: User;
  token: string;
}

export const signUp = async ({ email, password, fullName, username }: SignUp) =>
  await postRequest<LogInResponse, SignUp>('/signup', {
    email,
    password,
    fullName,
    username,
  });

export const logIn = async ({ email, password }: LogIn) =>
  await postRequest<LogInResponse, LogIn>('/login', {
    email,
    password,
  });

export const logOut = async () => await postRequest('/logout');
