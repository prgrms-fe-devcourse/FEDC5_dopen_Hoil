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
  value?: string;
}

export interface UserInfoInput {
  profileImage?: string;
  email: string;
  fullName: string;
  username: string;
  password: string;
  passwordConfirm: string;
  timerChannelId?: string;
}

export interface UserResponse {
  user: User;
  token: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
  isSavedId?: boolean;
}
