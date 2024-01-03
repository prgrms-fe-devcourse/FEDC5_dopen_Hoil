import { useForm } from 'react-hook-form';
import {
  Box,
  Heading,
  Text,
  Image,
  Checkbox,
  FormLabel,
  Flex,
  Divider,
  Avatar,
  UnorderedList,
  List,
} from '@chakra-ui/react';
import { Input, Button, Form } from '@/pages/SignUp';
import { DEFAULT_WIDTH } from '@/constants/style';
import { UserLoginInput, LoginInputProperty } from '@/types/user';

import { LOGIN_INPUT_VALIDATE } from '@/constants/inputValidate';

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

const Login = () => {
  const {
    register,
    formState: { errors },
  } = useForm<UserLoginInput>();

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

      <Form>
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
          />
          <FormLabel m="0 0 0 8px" fontSize="sm">
            아이디 저장하기
          </FormLabel>
        </Flex>
        <Button>로그인</Button>
        <Button
          type="button"
          style={{ backgroundColor: '#F5C6C2', marginTop: '18px' }}
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
        <List>
          <Text as="a" title="네이버 로그인">
            <Avatar
              size="40px"
              name="네이버 로그인"
              src="https://via.placeholder.com/40x40"
            />
          </Text>
        </List>
        <List>
          <Text as="a" title="카카오 로그인">
            <Avatar
              size="40px"
              name="카카오 로그인"
              src="https://via.placeholder.com/40x40"
            />
          </Text>
        </List>
      </UnorderedList>
    </Box>
  );
};

export default Login;
