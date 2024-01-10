import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AxiosError } from 'axios';
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Divider,
  Avatar,
  UnorderedList,
  ListItem,
  Checkbox,
} from '@chakra-ui/react';

import { Input, Button, Form } from '@/pages/SignUp';

import { UserLoginInput, LoginInputProperty } from '@/types/user';
import { LOGIN_INPUT_VALIDATE } from '@/constants/inputValidate';

import { preparing } from './preparing';
import { isValueUniqueInArray } from '@/utils/isValueUniqueInArray';
import { useGetUsersList } from '@/hooks/useUser';
import { useLogin } from '@/hooks/useAuth';
import { LOGINID_SAVEKEY } from '@/constants/user';
import { getItem } from '@/utils/storage';

const loginInputList: LoginInputProperty[] = [
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

const socialLoginList = [
  {
    name: '네이버',
    title: '네이버 로그인',
    src: 'src/assets/naver.png',
    href: 'https://naver.com',
  },
  {
    name: '카카오',
    title: '카카오 로그인',
    src: 'src/assets/kakao.png',
    href: 'https://www.kakaocorp.com/',
  },
];

const Login = () => {
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
    <Box w="100%" m="0 auto" textAlign="center" p="130px 20px">
      <Box mb="36px">
        <Heading mb="17px">
          <Image
            m="0 auto"
            w="198px"
            src="/assets/dopenLogo.svg"
            alt="Dopen Logo"
          />
        </Heading>
        <Box fontSize="md">
          <Text as="strong" fontSize="4xl" color="pink.300">
            안녕하세요 회원님
          </Text>
          <Text mt="15px">dopen에 오신것을 환영합니다.</Text>
        </Box>
      </Box>

      <Form onSubmit={handleSubmit(onLoginValid)}>
        <ul style={{ marginBottom: '0px' }}>
          {loginInputList.map(
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
      <Box margin="18px 0 23px">
        <UnorderedList display="flex" justifyContent="space-between">
          <ListItem
            listStyleType="none"
            fontSize="sm"
            w="calc(50% - 12px)"
            textAlign="right"
            _hover={{ textDecoration: 'underline' }}
          >
            <Link to="findid" title="아이디 찾기" onClick={preparing}>
              아이디 찾기
            </Link>
          </ListItem>
          <ListItem
            listStyleType="none"
            fontSize="sm"
            w="calc(50% - 12px)"
            textAlign="left"
            _hover={{ textDecoration: 'underline' }}
          >
            <Link to="findpassword" title="비밀번호 찾기" onClick={preparing}>
              비밀번호 찾기
            </Link>
          </ListItem>
        </UnorderedList>
      </Box>
      <Flex alignItems="center" margin="48px 0 32px">
        <Divider
          orientation="horizontal"
          borderColor="#666666"
          w="calc(50% - 25px)"
        />
        <Text as="p" w="50px" fontSize="sm">
          또는
        </Text>
        <Divider
          orientation="horizontal"
          borderColor="#666666"
          w="calc(50% - 25px)"
        />
      </Flex>
      <Box>
        <UnorderedList display="flex" justifyContent="space-evenly">
          {socialLoginList.map(({ name, title, src, href }) => (
            <ListItem key={name} listStyleType="none">
              <Text
                as="a"
                title={title}
                cursor="pointer"
                display="block"
                target="_blank"
                href={href}
                onClick={preparing}
              >
                <Avatar size="40px" name={title} src={src} />
              </Text>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default Login;
