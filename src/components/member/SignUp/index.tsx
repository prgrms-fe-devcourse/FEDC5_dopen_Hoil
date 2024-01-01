import styled from '@emotion/styled';
import { Box, Text, Heading, Image } from '@chakra-ui/react';
import { useForm, SubmitHandler, Path, RegisterOptions } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { signUp } from '@/apis/authentication';
import { setItem } from '@/utils/storage';
import { INPUT_VALIDATE } from '@/constants/inputValidate';
import { LOGIN_TOKEN } from '@/constants/user';

interface UserCrendentials {
  email: string;
  fullName: string;
  userName: string;
  password: string;
  passwordConfirm: string;
}

interface SignUpInputData {
  name: Path<UserCrendentials>;
  label: string;
  type: string;
  required: boolean;
  placeholder: string;
  validate?: RegisterOptions;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<UserCrendentials>();
  const navigate = useNavigate();

  const onValid: SubmitHandler<UserCrendentials> = async (data) => {
    if (data.password !== data.passwordConfirm) {
      setError(
        'passwordConfirm',
        { message: '비밀번호가 일치하지 않습니다.' },
        { shouldFocus: true },
      );
      return;
    }

    const signUpResponse = await signUp({
      email: data.email,
      fullName: data.fullName,
      password: data.password,
    });

    setItem(LOGIN_TOKEN, signUpResponse.token);
    navigate('/', { replace: true });
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
      name: 'userName',
      label: '닉네임',
      type: 'text',
      required: true,
      placeholder: '닉네임',
      validate: { ...INPUT_VALIDATE.userName },
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
