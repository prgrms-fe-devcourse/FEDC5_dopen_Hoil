import { LOGIN_INPUT_VALIDATE } from '@/constants/inputValidate';
import { LoginInputProperty } from '@/types/user';

export const LOGIN_INPUT_LIST: LoginInputProperty[] = [
  {
    name: 'email',
    label: '이메일',
    type: 'text',
    required: true,
    placeholder: '이메일을 입력해주세요',
    validate: { ...LOGIN_INPUT_VALIDATE.email },
  },
  {
    name: 'password',
    label: '비밀번호',
    type: 'password',
    required: true,
    placeholder: '비밀번호를 입력해주세요',
  },
];

export const SOCIAL_LOGIN_LIST = [
  {
    name: '네이버',
    title: '네이버 로그인',
    src: '/assets/naver.png',
    href: 'https://naver.com',
  },
  {
    name: '카카오',
    title: '카카오 로그인',
    src: '/assets/kakao.png',
    href: 'https://www.kakaocorp.com/',
  },
];
