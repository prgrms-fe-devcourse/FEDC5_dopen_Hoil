import { INPUT_VALIDATE } from '@/constants/inputValidate';
import { SignUpInputProperty } from '@/types/user';

export const USER_INPUT_LIST: SignUpInputProperty[] = [
  {
    name: 'email',
    label: '이메일',
    type: 'text',
    required: true,
    placeholder: '이메일',
    validate: { ...INPUT_VALIDATE.email },
  },
  {
    name: 'fullName',
    label: '이름',
    type: 'text',
    required: true,
    placeholder: '이름',
    validate: { ...INPUT_VALIDATE.fullName },
  },
  {
    name: 'username',
    label: '닉네임',
    type: 'text',
    required: true,
    placeholder: '닉네임',
    validate: { ...INPUT_VALIDATE.username },
  },
  {
    name: 'password',
    label: '비밀번호',
    type: 'password',
    required: true,
    placeholder: '비밀번호',
    validate: { ...INPUT_VALIDATE.password },
  },
  {
    name: 'passwordConfirm',
    label: '비밀번호 확인',
    type: 'password',
    required: true,
    placeholder: '비밀번호 확인',
  },
];
