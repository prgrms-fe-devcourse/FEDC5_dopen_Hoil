import styled from '@emotion/styled';
import { Text } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { DUMMY_DATA } from './data';
import { useState } from 'react';
const memberArray = DUMMY_DATA;

interface Inputs {
  email: string;
  fullName: string;
  userName: string;
  password: string;
  passwordConfirm: string;
}

const SignUp = () => {
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isValid },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // 이메일 정규표현식
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    if (!emailRegEx.test(data.email)) {
      alert('이메일 형식이 아닙니다. 이메일을 확인해주세요.');
      setFocus('email');
      return;
    }

    // 중복 이메일 검사
    const emailCheck = memberArray.some(
      (member) => member.email === data.email,
    );

    if (emailCheck) {
      alert('중복된 이메일 입니다.');
      setFocus('email');
      return;
    }

    // 이름 글자 수 검사
    if (data.fullName.trim().length < 2) {
      alert('이름을 2글자 이상 입력해주세요.');
      setFocus('fullName');
      return;
    }

    // 닉네임 글자 수 검사
    if (data.fullName.trim().length < 2) {
      alert('닉네임을 2글자 이상 입력해주세요.');
      setFocus('userName');
      return;
    }

    // 비밀번호 일치하지 않습니다.
    if (data.password !== data.passwordConfirm) {
      setMessage('비밀번호가 일치하지 않습니다.');
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비밀번호 검사
    const passwordRegEx =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    // 비밀번호 확인 (대소문자 및 특수문자 포함 8글자 ~ 20글자)
    if (!passwordRegEx.test(data.password)) {
      alert(
        '비밀번호는 최소 8자에서 최대 20자로 하나 이상의 대소문자, 하나의 숫자 및 하나의 특수 문자를 입력해주세요.',
      );
      setFocus('password');
      return;
    }

    // 회원가입 완료
    alert('회원가입 완료');
    navigate('/', { replace: true });
  };

  const navigate = useNavigate();

  return (
    <SignUpContainer>
      <div className="signup-title-container">
        <h2>
          <img src="https://via.placeholder.com/198x74" />
        </h2>
        <p>
          <span>이미 회원이신가요?</span>
          <Link to="/signin" title="로그인하기">
            로그인하기
          </Link>
        </p>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          <li>
            <Input
              {...register('email', { required: true })}
              type="text"
              placeholder="이메일"
            />
          </li>
          <li>
            <Input
              {...register('fullName', { required: true })}
              type="text"
              placeholder="이름"
            />
          </li>

          <li>
            <Input
              {...register('userName', { required: true })}
              type="text"
              placeholder="닉네임"
            />
          </li>
          <li>
            <Input
              {...register('password', { required: true })}
              type="password"
              placeholder="비밀번호"
            />
          </li>
          <li>
            <Input
              {...register('passwordConfirm', { required: true })}
              type="password"
              placeholder="비밀번호 확인"
            />
            <Text>{message}</Text>
          </li>
        </ul>

        {isValid ? (
          <SubmitButton>가입하기</SubmitButton>
        ) : (
          <SubmitButton style={{ backgroundColor: '#ccc' }} disabled>
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
