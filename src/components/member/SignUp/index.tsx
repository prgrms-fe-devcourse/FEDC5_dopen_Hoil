import { useQuery } from 'react-query';
import styled from '@emotion/styled';
import { Box, Text, Heading, Image } from '@chakra-ui/react';
import { useForm, SubmitHandler, Path, RegisterOptions } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { signUp } from '@/apis/authentication';
import { setItem } from '@/utils/storage';
import { INPUT_VALIDATE } from '@/constants/inputValidate';
import { LOGIN_TOKEN } from '@/constants/user';
import { UserResponse, UserInfoInput } from '@/types/user';

import { DUMMY_DATA } from './data';
interface SignUpInputData {
  name: Path<UserInfoInput>;
  label: string;
  type: string;
  required: boolean;
  placeholder: string;
  validate?: RegisterOptions;
}

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    setError,
  } = useForm<UserInfoInput>();

  const onSuccess = (data: UserResponse) => {
    alert('회원가입 성공');
    setItem(LOGIN_TOKEN, data.token);
    navigate('/');
  };

  const onError = (error: AxiosError) => {
    alert('회원가입 실패');
    throw new Error(error.message);
  };

  const { refetch } = useQuery(
    'signup',
    async () => {
      const { email, fullName, password } = getValues();
      return await signUp({ email, fullName, password });
    },
    {
      onSuccess,
      onError,
      enabled: false,
    },
  );

  const onValid: SubmitHandler<UserInfoInput> = async ({
    email,
    username,
    password,
    passwordConfirm,
  }) => {
    // 중복 이메일(아이디) 체크
    const UsersEmailCheck =
      DUMMY_DATA && DUMMY_DATA.some((user) => user.email === email);
    if (UsersEmailCheck) {
      setError(
        'email',
        { message: '동일한 이메일이 존재합니다.' },
        { shouldFocus: true },
      );
      return;
    }

    // 중복 닉네임 체크
    const UsersNickNameCheck =
      DUMMY_DATA && DUMMY_DATA.some((user) => user.username === username);
    if (UsersNickNameCheck) {
      setError(
        'username',
        { message: '동일한 닉네임이 존재합니다.' },
        { shouldFocus: true },
      );
      return;
    }

    // 비밀번호 일치 체크
    if (password !== passwordConfirm) {
      setError(
        'passwordConfirm',
        { message: '비밀번호가 일치하지 않습니다.' },
        { shouldFocus: true },
      );
      return;
    }

    refetch();
  };

  const signUpInputArray: SignUpInputData[] = [
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

  return (
    <Box maxWidth={428} m="0 auto" textAlign="center" p="130px 20px">
      <Box mb={30}>
        <Heading mb={6}>
          <Image
            m="0 auto"
            src="https://via.placeholder.com/198x74"
            alt="Dopen Logo"
          />
        </Heading>
        <Text fontSize="md">
          <Text as="span" mr={5}>
            이미 회원이신가요?
          </Text>
          <Link to="/signin" title="로그인하기" style={{ color: '#f88585' }}>
            로그인하기
          </Link>
        </Text>
      </Box>
      <Form onSubmit={handleSubmit(onValid)}>
        <ul>
          {signUpInputArray.map(
            ({ name, type, required, placeholder, validate }) => (
              <li key={name}>
                <Input
                  type={type}
                  placeholder={placeholder}
                  {...register(name, {
                    required,
                    ...validate,
                  })}
                />
                <Text mt={2} color="pink.300" fontSize="sm">
                  {errors && errors[name] && errors[name]?.message}
                </Text>
              </li>
            ),
          )}
        </ul>

        {isValid ? (
          <SubmitButton>가입하기</SubmitButton>
        ) : (
          <SubmitButton style={{ backgroundColor: '#A8A8A8' }}>
            가입하기
          </SubmitButton>
        )}
      </Form>
    </Box>
  );
};

const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #f88585;
  font-size: 16px;
  font-weight: bold;
  color: white;
  border-radius: 50px;
`;

const Form = styled.form`
  & ul {
    margin-bottom: 32px;
    & > li:not(:last-child) {
      margin-bottom: 18px;
    }

    & > li {
      text-align: left;
      list-style: none;

      & > span {
        display: inline-block;
        margin-top: 10px;
        font-size: 12px;
        color: #f88585;
      }
    }
  }
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  font-size: 14px;
  border-radius: 5px;
  background-color: #f0f0f0;
  padding-left: 15px;
`;

export default SignUp;
