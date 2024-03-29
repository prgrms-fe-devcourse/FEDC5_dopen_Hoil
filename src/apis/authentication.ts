import { getRequest, postRequest } from '@/apis/instance';
import { User } from '@/apis/type';

interface LogInPayload {
  email: string;
  password: string;
}

interface LogInResponse {
  user: User;
  token: string;
}

export const logIn = async ({ email, password }: LogInPayload) =>
  await postRequest<LogInResponse, LogInPayload>('/login', {
    email,
    password,
  });

interface SignUpPayload extends LogInPayload {
  fullName: string;
  username: string;
}

export const signUp = async ({
  email,
  password,
  fullName,
  username,
}: SignUpPayload) =>
  await postRequest<LogInResponse, SignUpPayload>('/signup', {
    email,
    password,
    fullName,
    username,
  });

export const logOut = async () => await postRequest('/logout');

export const checkAuthenticated = async (): Promise<User> =>
  await getRequest('/auth-user');

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const checkUserAuthentication = async (): Promise<User> => {
  const data = await checkAuthenticated();
  if (!data) {
    throw new AuthError('권한 없음');
  }
  return data;
};
