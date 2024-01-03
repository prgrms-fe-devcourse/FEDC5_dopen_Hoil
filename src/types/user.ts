import { User } from '@/apis/type';
import { Path, RegisterOptions } from 'react-hook-form';

export interface SignUpInputProperty {
  name: Path<UserInfoInput>;
  label: string;
  type: string;
  required: boolean;
  placeholder: string;
  validate?: RegisterOptions;
}

export interface LoginInputProperty {
  name: Path<UserLoginInput>;
  label: string;
  type: string;
  required: boolean;
  placeholder: string;
  validate?: RegisterOptions;
}

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
