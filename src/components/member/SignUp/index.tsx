import styled from '@emotion/styled';
import { Text, Heading } from '@chakra-ui/react';
import { useForm, SubmitHandler, Path, RegisterOptions } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { signUp } from '@/apis/authentication';
import { setItem } from '@/utils/storage';
import { INPUT_VALIDATE } from '@/constants/inputValidate';
import { LOGIN_TOKEN } from '@/constants/user';

interface Inputs {
  email: string;
  fullName: string;
  userName: string;
  password: string;
  passwordConfirm: string;
}

interface signUpInputData {
  name: Path<Inputs>;
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
  } = useForm<Inputs>();
  const navigate = useNavigate();

  const onValid: SubmitHandler<Inputs> = async (data) => {
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

  const signUpInputArray: signUpInputData[] = [
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
    <SignUpContainer>
      <div className="signup-title-container">
        <Heading>
          <img src="https://via.placeholder.com/198x74" />
        </Heading>
        <p>
          <span>이미 회원이신가요?</span>
          <Link to="/signin" title="로그인하기">
            로그인하기
          </Link>
        </p>
      </div>
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
    </SignUpContainer>
  );
};

const SignUpContainer = styled.div`
  max-width: 428px;
  margin: 0 auto;
  text-align: center;
  padding: 130px 20px;
  border: 1px solid #000;
  & .signup-title-container {
    margin-bottom: 30px;
    h2 {
      margin-bottom: 16px;
      img {
        margin: 0 auto;
      }
    }
    p {
      font-size: 14px;
      a {
        color: #f88585;
        padding-left: 12px;
      }
    }
  }
`;

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
