import { AxiosError } from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Box, Text, Heading, Image } from '@chakra-ui/react';

import { useSignUp } from '@/hooks/useAuth';
import { UserInfoInput } from '@/types/user';

import { USER_INPUT_LIST } from './userInputList';
import { validateUserInfo } from './validateUserInfo';

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    setError,
  } = useForm<UserInfoInput>();

  const onSuccessFn = () => {
    alert('회원가입 성공');
    navigate('/', { replace: true });
  };

  const onErrorFn = (error: AxiosError) => {
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

  const { mutate } = useSignUp({
    onSuccessFn,
    onErrorFn,
    userInfo: getValues(),
  });

  const onValid: SubmitHandler<UserInfoInput> = async (data) =>
    await validateUserInfo({ userData: data, setError, onSuccess: mutate });

  return (
    <Box w="100%" m="0 auto" textAlign="center" p="130px 20px">
      <Box mb={30}>
        <Heading mb={6}>
          <Image
            m="0 auto"
            w="198px"
            src="/assets/dopenLogo.svg"
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
          {USER_INPUT_LIST.map(
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
