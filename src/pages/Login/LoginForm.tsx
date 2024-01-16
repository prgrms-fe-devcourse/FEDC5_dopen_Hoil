import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Text, Checkbox, Flex } from '@chakra-ui/react';

import { getItem } from '@/utils/storage';

import { LOGIN_INPUT_LIST } from './loginInputList';
import { Input, Button, Form } from '@/pages/SignUp';
import { isValueUniqueInArray } from '@/utils/isValueUniqueInArray';
import { UserLoginInput } from '@/types/user';
import { LOGINID_SAVEKEY } from '@/constants/user';
import { AxiosError } from 'axios';
import { useGetUsersList } from '@/hooks/useUser';
import { useLogin } from '@/hooks/useAuth';
const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<UserLoginInput>({
    defaultValues: {
      email: getItem(LOGINID_SAVEKEY, ''),
      isSavedId: getItem(LOGINID_SAVEKEY, false) ? true : false,
    },
  });

  const onSuccessFn = () => {
    alert('로그인 성공');

    const path = location.state?.from?.pathname;
    if (!path || path === '/signup') {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  const onErrorFn = (error: AxiosError) => {
    if (error.response?.status === 400) {
      // 비밀번호가 틀렸을 때
      setError(
        'password',
        { message: '비밀번호를 확인해주세요.' },
        { shouldFocus: true },
      );
    }
  };

  const { mutate } = useLogin({
    onSuccessFn,
    onErrorFn,
    isSavedId: watch('isSavedId') ?? false,
  });
  const { data: userList = [] } = useGetUsersList();

  const onLoginValid: SubmitHandler<UserLoginInput> = async ({
    email,
    password,
  }) => {
    const isUserEmailCheck = isValueUniqueInArray(userList, 'email', email);
    if (isUserEmailCheck) {
      mutate({ email, password });
    } else {
      setError(
        'email',
        { message: '등록되지 않은 아이디입니다.' },
        { shouldFocus: true },
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit(onLoginValid)}>
      <ul style={{ marginBottom: '0px' }}>
        {LOGIN_INPUT_LIST.map(
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
              <Text mt={2} color="pink.300" fontSize="sm" textAlign="left">
                {errors && errors[name] && errors[name]?.message}
              </Text>
            </li>
          ),
        )}
      </ul>

      <Flex alignItems="center" m="10px 0 25px">
        <Checkbox
          size="lg"
          colorScheme="red"
          id="emailRemember"
          iconSize="lg"
          {...register('isSavedId')}
        >
          <Text as="span" fontSize="sm" color="#666">
            아이디 저장하기
          </Text>
        </Checkbox>
      </Flex>
      <Button>로그인</Button>
      <Button
        type="button"
        style={{ backgroundColor: '#F5C6C2', marginTop: '18px' }}
        onClick={() => navigate('/signup')}
      >
        회원가입 하기
      </Button>
    </Form>
  );
};

export default LoginForm;
