import { REGEXP } from './regexp';

export const INPUT_VALIDATE = {
  email: {
    pattern: {
      value: REGEXP.email,
      message: '이메일 형식이 아닙니다. 이메일을 확인해주세요.',
    },
  },
  fullName: {
    pattern: {
      value: REGEXP.fullName,
      message: '이름은 한글만 입력할 수 있습니다.',
    },
    minLength: {
      value: 2,
      message: '이름을 2글자 이상 입력해주세요.',
    },
  },
  username: {
    pattern: {
      value: REGEXP.username,
      message: '닉네임은 한글, 영문, 숫자 조합만 사용 가능합니다.',
    },
    minLength: {
      value: 2,
      message: '닉네임을 2글자 이상 입력해주세요.',
    },
    maxLength: {
      value: 20,
      message: '닉네임을 20글자 이하로 입력해주세요.',
    },
  },
  password: {
    pattern: {
      value: REGEXP.password,
      message:
        '비밀번호는 최소 8자에서 최대 20자로 하나 이상의 대소문자, 하나의 숫자 및 하나의 특수 문자를 입력해주세요.',
    },
  },
};
