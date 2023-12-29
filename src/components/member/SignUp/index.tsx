import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import useInput from '@/hooks/useInput';

import { DUMMY_DATA } from './data';

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

const SignUp = () => {
  const {
    value: email,
    onChange: onChangeEmail,
    inputRef: emailRef,
  } = useInput('');
  const {
    value: name,
    onChange: onChangeName,
    inputRef: nameRef,
  } = useInput('');
  const {
    value: nickName,
    onChange: onChangeNickName,
    inputRef: nickNameRef,
  } = useInput('');
  const {
    value: password,
    onChange: onChangePassWord,
    inputRef: passwordRef,
  } = useInput('');
  const {
    value: passwordConfirm,
    onChange: onChangePassWordConfirm,
    inputRef: passwordConfirmRef,
  } = useInput('');

  const memberArray = DUMMY_DATA;

  const onSubmitSignUp = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    // 이메일 정규표현식
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    if (!emailRegEx.test(email)) {
      alert('이메일 형식이 아닙니다. 이메일을 확인해주세요.');
      if (emailRef.current !== null) {
        emailRef.current.focus();
      }
      return;
    }

    // 중복 이메일 검사
    const emailCheck = memberArray.some((member) => member.email === email);

    if (emailCheck) {
      alert('중복된 이메일 입니다.');
      return;
    }

    // 이름 글자 수 검사
    if (name.trim().length < 2) {
      alert('이름을 2글자 이상 입력해주세요.');
      if (nameRef.current) {
        nameRef.current.focus();
      }
      return;
    }

    // 닉네임 글자 수 검사
    if (nickName.trim().length < 2 || nickName.trim().length > 10) {
      alert('닉네임을 2글자 이상 10글자 이하로 입력해주세요.');
      if (nickNameRef.current) {
        nickNameRef.current.focus();
      }
      return;
    }

    // 중복 닉네임 검사
    const nickNameCheck = memberArray.some(
      (member) => member.fullName === nickName,
    );

    if (nickNameCheck) {
      alert('중복된 닉네임 입니다.');
      return;
    }

    const passwordRegEx =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    // 비밀번호 확인 (대소문자 및 특수문자 포함 8글자 ~ 20글자)
    if (!passwordRegEx.test(password)) {
      alert(
        '비밀번호는 최소 8자에서 최대 20자로 하나 이상의 대소문자, 하나의 숫자 및 하나의 특수 문자를 입력해주세요.',
      );
      return;
    }

    // 회원가입 완료
    alert('회원가입 완료');
  };

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
      <Form onSubmit={onSubmitSignUp}>
        <ul>
          <li>
            <Input
              type="text"
              placeholder="이메일"
              name="email"
              value={email}
              ref={emailRef}
              onChange={onChangeEmail}
            />
          </li>
          <li>
            <Input
              type="text"
              placeholder="이름"
              name="name"
              value={name}
              ref={nameRef}
              onChange={onChangeName}
            />
          </li>
          <li>
            <Input
              type="text"
              placeholder="닉네임"
              name="nickname"
              value={nickName}
              ref={nickNameRef}
              onChange={onChangeNickName}
            />
          </li>
          <li>
            <Input
              type="password"
              placeholder="비밀번호"
              name="password"
              value={password}
              ref={passwordRef}
              onChange={onChangePassWord}
            />
          </li>
          <li>
            <Input
              type="password"
              placeholder="비밀번호 확인"
              name="passwordConfirm"
              value={passwordConfirm}
              ref={passwordConfirmRef}
              onChange={onChangePassWordConfirm}
            />
            {password !== passwordConfirm ? (
              <span>비밀번호가 다릅니다 확인해주세요.</span>
            ) : null}
          </li>
        </ul>
        {password === passwordConfirm &&
        email.trim().length &&
        name.trim().length &&
        nickName.trim().length &&
        password.length ? (
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

export default SignUp;
