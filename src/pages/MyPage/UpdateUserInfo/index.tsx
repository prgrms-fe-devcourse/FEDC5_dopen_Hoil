import { useMutation } from 'react-query';
import styled from '@emotion/styled';
import { Button, Input, Form } from '@/pages/SignUp';
import {
  Box,
  Flex,
  Avatar,
  Text,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { changeUserName, changePassword } from '@/apis/userInfo';
import { UserInputList } from '@/pages/SignUp';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UserInfoInput } from '@/types/user';
import { AxiosError } from 'axios';
import { User } from '@/apis/type';
import { userInfoValid } from '@/pages/SignUp/userInfoValid';

const UpdateUserInfo = () => {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<UserInfoInput>({
    defaultValues: {},
  });

  const onSuccess = async () => {
    // 2차 비밀번호 변경
    const { password } = getValues();
    await changePassword(password);
  };
  const onError = () => {};

  const { mutate } = useMutation<User, AxiosError>(
    async () => {
      // 1차 이름, 닉네임 변경
      const { fullName, username } = getValues();
      const changeUser = await changeUserName({ fullName, username });
      return changeUser;
    },
    {
      onSuccess,
      onError,
      meta: {
        errorMessage: '회원정보 수정에서 에러가 발생했습니다.',
      },
    },
  );

  const onUpdateUserInfoValid: SubmitHandler<UserInfoInput> = async (data) =>
    await userInfoValid({ userData: data, setError, callback: mutate });

  return (
    <Form
      style={{
        width: '100%',
        margin: '0 auto',
        height: '100vh',
        padding: '30px 20px',
      }}
      onSubmit={handleSubmit(onUpdateUserInfoValid)}
    >
      <UnorderedList ml="0">
        <ListItem mb="30px" listStyleType="none">
          <Flex alignItems="center">
            <Box w="118px" mr="32px">
              <Avatar
                size="118px"
                name="프로필 이미지 등록하기"
                src="https://via.placeholder.com/118x118"
              ></Avatar>
            </Box>
            <Box w="calc(100% - 150px)">
              <ProfileUploadFileBox>
                <label htmlFor="file">프로필 이미지 업로드</label>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  {...register('profileImage')}
                />
              </ProfileUploadFileBox>
              <Text
                fontSize="sm"
                color="gray.600"
                wordBreak="keep-all"
                mt="15px"
              >
                이미지 사이즈는 300x300 JPG, PNG, GIF 파일로 업로드 해주세요.
              </Text>
            </Box>
          </Flex>
        </ListItem>
        {UserInputList.map(({ name, label, type, required, validate }) => (
          <ListItem listStyleType="none" mb="15px" key={name}>
            <Text as="strong" fontSize="14px">
              {label}
            </Text>
            <Input
              type={type}
              required={name === 'email' ? false : required}
              disabled={name === 'email' ? true : false}
              {...register(name, {
                ...validate,
              })}
            />
            <Text mt={2} color="pink.300" fontSize="sm">
              {errors && errors[name] && errors[name]?.message}
            </Text>
          </ListItem>
        ))}
      </UnorderedList>
      <Button>회원정보 수정</Button>
      <Button
        type="button"
        style={{ backgroundColor: '#A09ABD', marginTop: '18px' }}
      >
        회원탈퇴
      </Button>
    </Form>
  );
};

const ProfileUploadFileBox = styled.div`
  display: inline-block;
  height: 42px;
  vertical-align: middle;
  width: 100%;
  border-radius: 20px;
  color: #999999;

  & > label {
    display: inline-block;
    padding: 10px 20px;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    vertical-align: middle;
    background-color: #f88585;
    border-radius: 20px;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
`;

export default UpdateUserInfo;
