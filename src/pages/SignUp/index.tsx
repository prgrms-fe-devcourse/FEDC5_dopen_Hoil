import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import styled from '@emotion/styled';
import { Box, Text, Heading, Image } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { signUp } from '@/apis/authentication';
import { getUserList } from '@/apis/userInfo';
import { getItem, setItem } from '@/utils/storage';
import { INPUT_VALIDATE } from '@/constants/inputValidate';
import { LOGIN_TOKEN } from '@/constants/user';
import { UserResponse, UserInfoInput, SignUpInputProperty } from '@/types/user';

import { useEffect } from 'react';

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (getItem(LOGIN_TOKEN, '')) {
      navigate('/', { replace: true });
    }
  }, []);

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
    navigate('/', { replace: true });
  };

  const onError = (error: AxiosError) => {
    if (!error.response) {
      // response가 없는 에러의 경우
      alert(error.message);
    }
    if (error.response?.status === 400) {
      setError(
        'email',
        { message: '동일한 이메일이 존재합니다.' },
        { shouldFocus: true },
      );
    }
  };

  const { mutate } = useMutation<UserResponse, AxiosError>(
    async () => {
      const { email, fullName, username, password } = getValues();
      return await signUp({ email, fullName, username, password });
    },
    {
      onSuccess,
      onError,
      meta: {
        errorMessage: '회원가입에서 에러가 발생했습니다.',
      },
    },
  );

  const onValid: SubmitHandler<UserInfoInput> = async ({
    username,
    password,
    passwordConfirm,
  }) => {
    const userList = await getUserList({});

    // 중복 닉네임 체크
    const UsersNickNameCheck =
      userList && userList.some((user) => user.username === username);
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

    mutate();
  };

  const signUpInputArray: SignUpInputProperty[] = [
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
          <Link to="/login" title="로그인하기" style={{ color: '#f88585' }}>
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
          <Button>가입하기</Button>
        ) : (
          <Button style={{ backgroundColor: '#A8A8A8' }}>가입하기</Button>
        )}
      </Form>
    </Box>
  );
};

export const Button = styled.button`
  width: 100%;
  height: 50px;
  background-color: #f88585;
  font-size: 16px;
  font-weight: bold;
  color: white;
  border-radius: 50px;
`;

export const Form = styled.form`
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

export const Input = styled.input`
  width: 100%;
  height: 50px;
  font-size: 14px;
  border-radius: 5px;
  background-color: #f0f0f0;
  padding-left: 15px;
`;

export default SignUp;
