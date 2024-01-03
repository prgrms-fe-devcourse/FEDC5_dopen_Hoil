import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import {
  Box,
  Heading,
  Text,
  Image,
  Checkbox,
  Flex,
  Divider,
  Avatar,
  UnorderedList,
  List,
} from '@chakra-ui/react';
import { Input, Button, Form } from '@/pages/SignUp';
import { DEFAULT_WIDTH } from '@/constants/style';
import { getUserList } from '@/apis/userInfo';
import { logIn } from '@/apis/authentication';
import { User } from '@/apis/type';
import { UserResponse, UserLoginInput, LoginInputProperty } from '@/types/user';
import { LOGIN_TOKEN, LOGINID_SAVEKEY } from '@/constants/user';
import { removeItem, setItem, getItem } from '@/utils/storage';

import { LOGIN_INPUT_VALIDATE } from '@/constants/inputValidate';

const loginInputList: LoginInputProperty[] = [
  {
    name: 'email',
    label: '이메일',
    type: 'text',
    required: true,
    placeholder: '이메일을 입력해주세요',
    validate: { ...LOGIN_INPUT_VALIDATE.email },
    value: getItem(LOGINID_SAVEKEY, ''),
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
    src: 'https://via.placeholder.com/40x40',
  },
  {
    name: '카카오',
    title: '카카오 로그인',
    src: 'https://via.placeholder.com/40x40',
  },
];

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
  } = useForm<UserLoginInput>({
    defaultValues: {
      email: getItem(LOGINID_SAVEKEY, ''),
      saveId: getItem(LOGINID_SAVEKEY, '') ? true : false,
    },
  });

  const onSuccess = (data: UserResponse) => {
    alert('로그인 성공');
    if (getValues('saveId')) {
      // 아이디 로컬 스토리지에 저장
      setItem(LOGINID_SAVEKEY, getValues('email'));
    } else {
      // 아이디 로컬 스토리지에서 삭제
      removeItem(LOGINID_SAVEKEY);
    }
    setItem(LOGIN_TOKEN, data.token);
    navigate('/', { replace: true });
  };

  const onError = (error: AxiosError) => {
    if (error.response?.status === 400) {
      // 비밀번호가 틀렸을 때
      setError(
        'password',
        { message: '비밀번호를 확인해주세요.' },
        { shouldFocus: true },
      );
    }
  };

  const { mutate } = useMutation<UserResponse, AxiosError>(
    async () => {
      const { email, password } = getValues();
      return await logIn({ email, password });
    },
    {
      onSuccess,
      onError,
      meta: {
        errorMessage: '로그인에서 에러가 발생했습니다.',
      },
    },
  );

  const onValid: SubmitHandler<UserLoginInput> = async ({ email }) => {
    const userList = await getUserList({});
    const emailCheck = userList.some(
      (userData: User) => userData.email === email,
    );
    if (emailCheck) {
      mutate();
    } else {
      setError(
        'email',
        { message: '등록되지 않은 아이디입니다.' },
        { shouldFocus: true },
      );
    }
  };

  return (
    <Box
      maxWidth={DEFAULT_WIDTH}
      m="0 auto"
      textAlign="center"
      p="130px 20px"
      border="1px solid"
    >
      <Box mb="36px">
        <Heading mb="17px">
          <Image
            m="0 auto"
            src="https://via.placeholder.com/198x74"
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

      <Form onSubmit={handleSubmit(onValid)}>
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
            iconColor="lg"
            id="emailRemember"
            {...register('saveId')}
          />
          <label
            htmlFor="emailRemember"
            style={{ marginLeft: '8px', fontSize: '12px', color: '#666' }}
          >
            아이디 저장하기
          </label>
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
      <UnorderedList display="flex" justifyContent="space-evenly">
        {socialLoginList.map(({ name, title, src }) => (
          <List key={name}>
            <Text as="a" title={title}>
              <Avatar size="40px" name={title} src={src} />
            </Text>
          </List>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default Login;
