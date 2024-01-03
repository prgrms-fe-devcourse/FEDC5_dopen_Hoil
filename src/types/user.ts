import { User } from '@/apis/type';

export interface UserInfoInput {
  email: string;
  fullName: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

export interface UserResponse {
  user: User;
  token: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
}
